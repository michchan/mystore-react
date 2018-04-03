import { combineReducers } from 'redux';
import { apps } from './apps';
import { topFreeApps } from './top_free_apps';
import { topGrossingApps } from './top_grossing_apps';

export const rootReducer = combineReducers({
    apps,
    topFreeApps,
    topGrossingApps,
});

export default rootReducer;