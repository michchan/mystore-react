import { combineReducers } from 'redux';
import { apps } from './apps';
import { topFreeApps } from './top_free_apps';
import { topGrossingApps } from './top_grossing_apps';
import { homeUi } from './home_ui';
import { filter } from './filter';

export const rootReducer = combineReducers({
    apps,
    topFreeApps,
    topGrossingApps,
    homeUi,
    filter,
});

export default rootReducer;