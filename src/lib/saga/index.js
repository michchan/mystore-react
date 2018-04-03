import { take, call, put, race, all, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import _ from 'lodash';
import moment from 'moment';

const performance = window.performance || null; // Fix Android undefined performance
const DEFAULT_WARM_UP_TIMEOUT_SCALING_FACTOR = 2;
const warmedUpList = [];  
// record action types which has been called once as having warming up,
// this is related to request duration behaviour

export const handleApiCallConfigKeys = {
    startedType: 'startedType',
    successType: 'successType',
    unsuccessError: 'unsuccessError',
    errorType: 'errorType',
    callFunction: 'callFunction',
    callParams: 'callParams',
    extraRaces: 'extraRaces',
    extraRacesHandlers: 'extraRacesHandlers',
    extraStartedPayload: 'extraStartedPayload',
    extraSuccessPayload: 'extraSuccessPayload',
    extraErrorPayload: 'extraErrorPayload',
    callbackOnSuccess: 'callbackOnSuccess',
    callbackOnError: 'callbackOnError',
    processData: 'processData',
    bindProcessedDataToAction: 'bindProcessedDataToAction',
    requestTimeout: 'requestTimeout',
    warmUpEnabled: 'warmUpEnabled', // The request need to warm up for the first time getting called, so timeout is multiplied
    triggerUi: 'triggerUi',
}

/**
 * 
 * @param {Object} config - {
 *    startedType: '',
 *    successType: '',
 *    unsuccessError,
 *    errorType: '',
 *    callFunction: () => {},
 *    callParams: [],
 *    extraRaces: {
 *      key: effect,
 *    },
 *    extraRacesHandlers: {
 *      key: handler,
 *    },
 *    extraSuccessPayload: {
 *      key: data,
 *    },
*     extraErrorPayload: {
        key: data,
*     }
      callbackOnSuccess: {
        key: handler,
      },
      callbackOnError: {
        key: handler,
      },
      processData: (data) => data,
      bindProcessedDataToAction: false,
      requestTimeout: 7000,
      warmUpEnabled: false,
      triggerUi: 'homeStack',
 * } 
 */
export const handleApiCall = function * handleApiCall(config) {
    const keys = {
        API_CALL: 'apiCall',
        TIMEOUT: 'timeout',
    }
    const {
        startedType,
        successType,
        unsuccessError,
        errorType,
        callFunction,
        callParams,
        extraRaces,
        extraRacesHandlers,
        extraStartedPayload,
        extraSuccessPayload,
        extraErrorPayload,
        callbackOnSuccess,
        processData,
        bindProcessedDataToAction,
        requestTimeout,
        warmUpEnabled,
        triggerUi,
    } = config;
    
    /* Manipulate config params */
    const _extraRaces = extraRaces || {};
    const _extraRacesHandlers = extraRacesHandlers || {};
    const _extraStartedPayload = extraStartedPayload || {};
    const _extraSuccessPayload = extraSuccessPayload || {};
    const _extraErrorPayload = extraErrorPayload || {};
    const _callFunction = callFunction || (function*(){ console.log('callFunction is not passed'); return; });
    const _callParams = callParams || [];
    const _callbackOnSuccess = callbackOnSuccess || {};
    const _callbackOnError = callbackOnError || {};
    const _processData = processData || (function*(data){ return data; });
    // Multiply the timeout tolerance if warming up is enabled this is the first time the request get called.
    const isNotWarmedUp = !warmedUpList.find(t => t === startedType);
    const _requestTimeout = (warmUpEnabled && isNotWarmedUp) ? 
        (requestTimeout * DEFAULT_WARM_UP_TIMEOUT_SCALING_FACTOR) : requestTimeout || 7000;
    const _unsuccessError = unsuccessError || 'Fetch Data Unsuccessful';
    
    /* Start flow */
    try {
        yield put({ type: startedType, ..._extraStartedPayload, triggerUi });
        
        const ts = (performance && performance.now()) || 0; // time start, for performance evaluation

        // Get API caller, see if single caller or multiple callers
        let apiCall;

        if (typeof _callFunction === 'function') apiCall = call(_callFunction, ..._callParams);

        if (typeof _callFunction === 'object') {
            const allEffectsObj = {};

            _.forEach(_callFunction, (func, callerKey) => {
                let eachCallParams = [];

                _.isObject(_callParams) && _.forEach(_callParams, (params, paramKey) => {
                    if (paramKey === callerKey) eachCallParams = params;
                });

                allEffectsObj[callerKey] = call(func, ...eachCallParams);
            });

            apiCall = all(allEffectsObj);
        }

        // Start race
        const winner = yield race({
            [keys.API_CALL]: apiCall, //Support "all" effect call
            [keys.TIMEOUT]: call(delay, _requestTimeout),
            ..._extraRaces,
        });
        
        const te = (performance && performance.now()) || 0;  // time end, for performance evaluation
        const raceDuration = te - ts;
        console.log(`
            [SAGA/handleApiCall]: Started type: ${startedType};
            Request duration: `, raceDuration, `;
            Request timeout: ${_requestTimeout};
            Is timeout: ${!!winner[keys.TIMEOUT]}
        `);

        if (isNotWarmedUp) 
            warmedUpList.push(startedType); // indicate this request has been warmed up

        for (const wKey in winner) {
            // if API call has been resolved successfully..
            if (winner[wKey]) {
                if (wKey === keys.API_CALL) {
                    let action = {
                        type: successType,
                        fetchMoment: moment(),
                        triggerUi,
                        ..._extraSuccessPayload,
                    }

                    // Trigger passed callbacks on success
                    for (const key in _callbackOnSuccess) {
                        if (typeof _callbackOnSuccess[key] === 'function') {
                            action[key] = yield call(_callbackOnSuccess[key]);
                        }
                    }

                    const apiData = typeof _callFunction === 'object' ? _.mapValues(winner[wKey], 'data') : winner[wKey].data;

                    // If the request does return data (response)
                    if (apiData) {
                        // Bind data to action.data or bind to action directly
                        if (bindProcessedDataToAction) {
                            const data = yield call(_processData, apiData) || apiData;
                            
                            action = {
                                ...action,
                                ...data
                            };
                        } else {
                            action.data = yield call(_processData, apiData) || apiData;
                        }

                        yield put(action);

                    } else {
                        throw new Error(_unsuccessError);
                    }
                    return;
                }
                if (wKey === keys.TIMEOUT) {
                    throw new Error('Timeout');
                    return;
                }

                // additonal races
                for (const aKey in _extraRacesHandlers) {
                    if (wKey === aKey) {
                        (_extraRacesHandlers[aKey])();
                    }
                }
            }
        }

    } catch (error) {
        yield put({ type: errorType, error, ..._extraErrorPayload, triggerUi });

        // Trigger passed callbacks on error
        for (const key in _callbackOnError) {
            if (typeof _callbackOnError[key] === 'function') {
                action[key] = yield call(_callbackOnError[key]);
            }
        }
    }
}

