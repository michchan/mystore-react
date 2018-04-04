import { createSelector } from 'reselect';


export const appsEntitiesSelector = state => state.apps.entities;
export const topFreeAppsResultSelector = state => state.topFreeApps.result;
export const topGrossingAppsResultSelector = state => state.topGrossingApps.result;
export const topGrossingAppsMetaSelector = state => state.topGrossingApps.meta;

const getAll = (entities, result) => result.map(id => entities[id]);

export const topFreeAppsSelector = createSelector(
    appsEntitiesSelector,
    topFreeAppsResultSelector,
    getAll
);

export const topGrossingAppsSelector = createSelector(
    appsEntitiesSelector,
    topGrossingAppsResultSelector,
    getAll
);