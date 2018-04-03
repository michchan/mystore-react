import { normalize, schema } from 'normalizr';
import _ from 'lodash';
import { appStoreEntryFields, appStoreEntryMap } from '../api';
import { mapApiFields } from '../lib/api';

export const appStoreEntryNormalizedSchema = new schema.Entity('apps', {}, {
    idAttribute: appStoreEntryFields.ID,
});

export const appStoreEntriesNormalizedSchema = [appStoreEntryNormalizedSchema];