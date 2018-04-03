import axios from 'axios';
import qs from 'qs';
import { Record, Map } from 'immutable';
import schema, { PropTypes, validate } from 'react-schema';
import _ from 'lodash';

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.paramsSerializer = (params) => qs.stringify(params);

export const APIConfigKeys = {
    ENDPOINT: 'endpoint',
    METHOD: 'method',
    IS_LIST: 'isList',
    RESPONSE_SCHEMA: 'responseSchema',
    DEEP_SCHEMA: 'deepSchema',
    BODY_KEYS: 'bodyKeys',
    QUERY_KEYS: 'queryKeys',
    PARAM_KEYS: 'paramKeys',
    REQUIRE_ACCESS_TOKEN: 'requireAccessToken',
    REQUIRE_REFRESH_TOKEN: 'requireRefreshToken',
    CONTENT_TYPE: 'contentType',
    CONDITIONAL_KEY: 'conditionalKey',
    CONDITIONAL_SCHEMA: 'conditionalSchema',
};

export const APIConfig = Record({
    [APIConfigKeys.ENDPOINT]: '/universities',
    [APIConfigKeys.METHOD]: 'get',
    [APIConfigKeys.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
    [APIConfigKeys.IS_LIST]: false,
    [APIConfigKeys.RESPONSE_SCHEMA]: {},
    [APIConfigKeys.DEEP_SCHEMA]: {},
    [APIConfigKeys.REQUIRE_ACCESS_TOKEN]: true,
    [APIConfigKeys.REQUIRE_REFRESH_TOKEN]: false,
    [APIConfigKeys.BODY_KEYS]: {},
    [APIConfigKeys.QUERY_KEYS]: {},
    [APIConfigKeys.PARAM_KEYS]: {},
    [APIConfigKeys.CONDITIONAL_KEY]: '',
    [APIConfigKeys.CONDITIONAL_SCHEMA]: {},
});

export const DeepSchema = Record({
    [APIConfigKeys.IS_LIST]: false,
    [APIConfigKeys.RESPONSE_SCHEMA]: {},
    [APIConfigKeys.DEEP_SCHEMA]: {},
    [APIConfigKeys.CONDITIONAL_KEY]: '',
    [APIConfigKeys.CONDITIONAL_SCHEMA]: {},
})

export const validateResponseSchema = (config, response) => {
    const isList = config[APIConfigKeys.IS_LIST];
    const resSchema = config[APIConfigKeys.CONDITIONAL_SCHEMA];
    const deepSchema = config[APIConfigKeys.DEEP_SCHEMA];

    if (isList) {
        for (const item of response) {
            const conditionalSchema = constructConditionalSchema(config, item);
            const validation = schema.validate(conditionalSchema, item);
            if (!checkValidation(validation)) return false;
            if (!checkDeepSchema(deepSchema, item)) return false;
        }
    } else {
        const conditionalSchema = constructConditionalSchema(config, response);
        const validation = schema.validate(conditionalSchema, response);
        if (!checkValidation(validation)) return false;
        if (!checkDeepSchema(deepSchema, response)) return false;
    }
    return true;
}

const checkValidation = (validation) => {
    if (!validation.isValid) {
        console.log(validation.errors);
        return false;
    }
    return true;
}

const checkDeepSchema = (deepSchema, response) => {
    if (deepSchema && _.isObject(deepSchema)) {
        for (const key in deepSchema) {
            if (response[key]) {
                if (!validateResponseSchema(deepSchema[key], response[key])) 
                return false;
            }
        }
    }
    return true;
}

const constructConditionalSchema = (config, response) => {
    const conditionalKey = config[APIConfigKeys.CONDITIONAL_KEY];
    const conditionalSchema = config[APIConfigKeys.CONDITIONAL_SCHEMA];
    const resSchema = config[APIConfigKeys.RESPONSE_SCHEMA]
    let returnSchema = { ...resSchema };
    if (conditionalKey) {
        const addonSchema = conditionalSchema[response[conditionalKey]];
        if (addonSchema) {
            returnSchema = {
                ...returnSchema,
                ...addonSchema,
            };
        }
    }
    return returnSchema;
}

export const getAxiosInstance = () => axios;

const getBearerAuthHeaders = (token) => `Bearer ${token}`;

export const getAPICaller = (config) => {
    const endpoint = config[APIConfigKeys.ENDPOINT];
    const method = config[APIConfigKeys.METHOD];
    const contentType = config[APIConfigKeys.CONTENT_TYPE];
    const requireAccessToken = config[APIConfigKeys.REQUIRE_ACCESS_TOKEN];
    const requireRefreshToken = config[APIConfigKeys.REQUIRE_REFRESH_TOKEN];
    const paramKeys = config[APIConfigKeys.PARAM_KEYS];
    const queryKeys = config[APIConfigKeys.QUERY_KEYS];
    const bodyKeys = config[APIConfigKeys.BODY_KEYS];

    return function () {
        const args = Array.from(arguments);
        const paddingObj = {};
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        let url = endpoint;
        let authToken;
        let params = {};
        let data = {};

        if (requireAccessToken || requireRefreshToken) {
            authToken = _.isString(args[0])? args.shift() : '';
            if (authToken) {
                headers['Authorization'] = getBearerAuthHeaders(authToken);
            }
        }
        if (!_.isEmpty(paramKeys)) {
            if (typeof endpoint === 'function') {
                const pathParams = _.isObject(args[0])? args.shift() : {};
                url = endpoint(pathParams);
            }
        }
        if (!_.isEmpty(bodyKeys)) {
            data = _.isObject(args[0])? args.shift() : {};
        }
        if (!_.isEmpty(queryKeys)) {
            params = _.isObject(args[0])? args.shift() : {};
        }

        if (contentType) {
            headers['Content-Type'] = contentType;
        }
        if (method === 'post') {
            const passedData = headers['Content-Type'] === 'application/json'? data : qs.stringify(data);
            paddingObj.data = passedData;
        }

        return axios({
            url,
            method,
            headers,
            params,
            ...paddingObj,
        });
    }
}

export const mapApiFields = (data, mapConfig = []) => {
    if (!_.isArray(data) && !_.isObject(data)) return;
    const _data = _.isArray(data)? data : [data]; //convert all to array

    const parsedData = _data.map(item => {
        const parsedItem = {};

        mapConfig.map(keyMap => {
            // If the 'in' key is flat
            if (_.isString(keyMap.in) || !isNaN(keyMap.in)) {
                parsedItem[keyMap.out] = keyMap.type === 'number'? +item[keyMap.in] : item[keyMap.in];
                return;
            }
            // If the 'in' key is nested
            if (_.isArray(keyMap.in)) {
                let itemBuffer = item;

                keyMap.in.map(inKey => {
                    itemBuffer = itemBuffer[inKey];
                });
                
                parsedItem[keyMap.out] = keyMap.type === 'number'? +itemBuffer : itemBuffer;
                return;
            }
        });
        
        return parsedItem;
    });

    return _.isArray(data)? parsedData : parsedData[0]; // return the passed format
}