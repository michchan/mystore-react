import { 
    APIConfig,
    APIConfigKeys as keys,
    APIConfigKeys,
} from '../lib/api/index';

import * as fields from './fields';
import * as paramKeys from './params';

export const getTopFreeAppsAPI = new APIConfig({
    [keys.ENDPOINT]: (params) => `topfreeapplications/limit=${params[paramKeys.topFreeAppsParams.LIMIT]}/json`,
    [keys.METHOD]: 'get',
    [keys.PARAM_KEYS]: paramKeys.topFreeAppsParams,
});