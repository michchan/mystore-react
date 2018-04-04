import { normalize, schema } from 'normalizr';
import _ from 'lodash';
import { appFields, appStoreEntryMap } from '../api';
import { mapApiFields } from '../lib/api';

export const appStoreEntryNormalizedSchema = new schema.Entity('apps', {}, {
    idAttribute: appFields.ID,
});

export const appStoreEntriesNormalizedSchema = [appStoreEntryNormalizedSchema];