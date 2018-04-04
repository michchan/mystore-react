import { 
    APIConfig,
    APIConfigKeys as keys,
    APIConfigKeys,
} from '../lib/api/index';

import * as fields from './fields';
import * as paramKeys from './params';

export const getTopFreeAppsAPI = new APIConfig({
    [keys.ENDPOINT]: (params) => `rss/topfreeapplications/limit=${params[paramKeys.topFreeAppsParams.LIMIT]}/json`,
    [keys.METHOD]: 'get',
    [keys.PARAM_KEYS]: paramKeys.topFreeAppsParams,
});

export const getTopGrossingAppsAPI = new APIConfig({
    [keys.ENDPOINT]: (params) => `rss/topgrossingapplications/limit=${params[paramKeys.topGrossingAppsParams.LIMIT]}/json`,
    [keys.METHOD]: 'get',
    [keys.PARAM_KEYS]: paramKeys.topGrossingAppsParams,
});

export const getAppLookupAPI = new APIConfig({
    [keys.ENDPOINT]: 'lookup',
    [keys.METHOD]: 'get',
    [keys.QUERY_KEYS]: paramKeys.appLookUpQuery
})