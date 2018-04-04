import { createSelector } from 'reselect';
import { filterTermsSelector } from './filter';
import { appFields } from '../api';
import { findStringIgnoreCase } from '../lib/string';


export const appsEntitiesSelector = state => state.apps.entities;
export const topFreeAppsResultSelector = state => state.topFreeApps.result;
export const topGrossingAppsResultSelector = state => state.topGrossingApps.result;
export const topGrossingAppsMetaSelector = state => state.topGrossingApps.meta;

const getAll = (entities, result, filterTerms) => {
    const mappedResult = result.map(id => entities[id]);

    return mappedResult.filter(entity => {
        for (const term of filterTerms) {
            if (findStringIgnoreCase(entity[appFields.NAME], term))
                return true;
        }

        if (filterTerms.length === 0) // if no filter text input
            return true;

        return false;
    });
}

export const topFreeAppsSelector = createSelector(
    appsEntitiesSelector,
    topFreeAppsResultSelector,
    filterTermsSelector,
    getAll
);

export const topGrossingAppsSelector = createSelector(
    appsEntitiesSelector,
    topGrossingAppsResultSelector,
    filterTermsSelector,
    getAll
);