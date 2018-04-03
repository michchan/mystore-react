import { appStoreEntryFields, appStoreMetaFields } from ".";

/* Map API fields to used fields */
export const appStoreEntryMap = [
    {
        in: ['im:name', 'label'],
        out: appStoreEntryFields.NAME
    },
    {
        in: ['im:image', 0, 'label'],
        out: appStoreEntryFields.ICON
    },
    {
        in: ['im:image', 0, 'attributes', 'height'],
        out: appStoreEntryFields.ICON_HEIGHT,
        type: 'number',
    },
    {
        in: ['im:image', 1, 'label'],
        out: appStoreEntryFields.ICON_2X
    },
    {
        in: ['im:image', 1, 'attributes', 'height'],
        out: appStoreEntryFields.ICON_2X_HEIGHT,
        type: 'number',
    },
    {
        in: ['im:image', 2, 'label'],
        out: appStoreEntryFields.ICON_3X
    },
    {
        in: ['im:image', 2, 'attributes', 'height'],
        out: appStoreEntryFields.ICON_3X_HEIGHT,
        type: 'number',
    },
    {
        in: ['summary', 'label'],
        out: appStoreEntryFields.SUMMARY
    },
    {
        in: ['im:price', 'label'],
        out: appStoreEntryFields.PRICE_LABEL
    },
    {
        in: ['im:price', 'attributes', 'amount'],
        out: appStoreEntryFields.PRICE_AMOUNT,
        type: 'number',
    },
    {
        in: ['im:price', 'attributes', 'currency'],
        out: appStoreEntryFields.PRICE_CURRENCY
    },
    {
        in: ['im:contentType', 'attributes', 'term'],
        out: appStoreEntryFields.CONTENT_TYPE_TERM
    },
    {
        in: ['im:contentType', 'attributes', 'label'],
        out: appStoreEntryFields.CONTENT_TYPE_LABEL
    },
    {
        in: ['rights', 'label'],
        out: appStoreEntryFields.RIGHTS
    },
    {
        in: ['title', 'label'],
        out: appStoreEntryFields.TITLE
    },
    {
        in: ['link', 'attributes', 'rel'],
        out: appStoreEntryFields.LINK_REL
    },
    {
        in: ['link', 'attributes', 'type'],
        out: appStoreEntryFields.LINK_TYPE
    },
    {
        in: ['link', 'attributes', 'href'],
        out: appStoreEntryFields.LINK_HREF
    },
    {
        in: ['id', 'attributes', 'im:id'],
        out: appStoreEntryFields.ID,
        type: 'number',
    },
    {
        in: ['id', 'attributes', 'im:bundleId'],
        out: appStoreEntryFields.BUNDLE_ID
    },
    {
        in: ['im:artist', 'label'],
        out: appStoreEntryFields.ARTIST_LABEL
    },
    {
        in: ['im:artist', 'attributes', 'href'],
        out: appStoreEntryFields.ARTIST_HREF
    },
    {
        in: ['category', 'attributes', 'im:id'],
        out: appStoreEntryFields.CATEGORY_ID,
        type: 'number',
    },
    {
        in: ['category', 'attributes', 'term'],
        out: appStoreEntryFields.CATEGORY_TERM
    },
    {
        in: ['category', 'attributes', 'scheme'],
        out: appStoreEntryFields.CATEGORY_SCHEME
    },
    {
        in: ['category', 'attributes', 'label'],
        out: appStoreEntryFields.CATEGORY_LABEL
    },
    {
        in: ['im:releaseDate', 'label'],
        out: appStoreEntryFields.RELEASE_DATE_TIMESTAMP
    },
    {
        in: ['im:releaseDate', 'attributes', 'label'],
        out: appStoreEntryFields.RELEASE_DATE_LABEL
    },
];

export const appStoreMetaMap = [
    {
        in: ['author', 'name', 'label'],
        out: appStoreMetaFields.STORE_NAME,
    },
    {
        in: ['author', 'uri', 'label'],
        out: appStoreMetaFields.STORE_URI,
    },
    {
        in: ['updated', 'label'],
        out: appStoreMetaFields.LAST_UPDATE,
    },
    {
        in: ['rights', 'label'],
        out: appStoreMetaFields.RIGHTS,
    },
    {
        in: ['title', 'label'],
        out: appStoreMetaFields.TITLE,
    },
    {
        in: ['icon', 'label'],
        out: appStoreMetaFields.ICON,
    },
    {
        in: ['link', 0, 'attributes', 'rel'],
        out: appStoreMetaFields.LINK_REL
    },
    {
        in: ['link', 0, 'attributes', 'type'],
        out: appStoreMetaFields.LINK_TYPE
    },
    {
        in: ['link', 0, 'attributes', 'href'],
        out: appStoreMetaFields.LINK_HREF
    },
];