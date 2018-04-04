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
            // filter by app name
            if (findStringIgnoreCase(entity[appFields.NAME], term))
                return true;
            // filter by author
            if (findStringIgnoreCase(entity[appFields.ARTIST_LABEL], term))
                return true;
            // filter by genres
            for (const genre of entity[appFields.GENRES]) {
                if (findStringIgnoreCase(genre, term)) 
                    return true;
            }
            // filter by summary
            if (findStringIgnoreCase(entity[appFields.SUMMARY], term))
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