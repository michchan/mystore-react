import { appFields, appStoreMetaFields } from ".";

/* Map API fields to used fields */
export const appStoreEntryMap = [
    {
        in: ['im:name', 'label'],
        out: appFields.NAME
    },
    {
        in: ['im:image', 0, 'label'],
        out: appFields.ICON
    },
    {
        in: ['im:image', 0, 'attributes', 'height'],
        out: appFields.ICON_HEIGHT,
        type: 'number',
    },
    {
        in: ['im:image', 1, 'label'],
        out: appFields.ICON_2X
    },
    {
        in: ['im:image', 1, 'attributes', 'height'],
        out: appFields.ICON_2X_HEIGHT,
        type: 'number',
    },
    {
        in: ['im:image', 2, 'label'],
        out: appFields.ICON_3X
    },
    {
        in: ['im:image', 2, 'attributes', 'height'],
        out: appFields.ICON_3X_HEIGHT,
        type: 'number',
    },
    {
        in: ['summary', 'label'],
        out: appFields.SUMMARY
    },
    {
        in: ['im:price', 'label'],
        out: appFields.PRICE_LABEL
    },
    {
        in: ['im:price', 'attributes', 'amount'],
        out: appFields.PRICE_AMOUNT,
        type: 'number',
    },
    {
        in: ['im:price', 'attributes', 'currency'],
        out: appFields.PRICE_CURRENCY
    },
    {
        in: ['im:contentType', 'attributes', 'term'],
        out: appFields.CONTENT_TYPE_TERM
    },
    {
        in: ['im:contentType', 'attributes', 'label'],
        out: appFields.CONTENT_TYPE_LABEL
    },
    {
        in: ['rights', 'label'],
        out: appFields.RIGHTS
    },
    {
        in: ['title', 'label'],
        out: appFields.TITLE
    },
    {
        in: ['link', 'attributes', 'rel'],
        out: appFields.LINK_REL
    },
    {
        in: ['link', 'attributes', 'type'],
        out: appFields.LINK_TYPE
    },
    {
        in: ['link', 'attributes', 'href'],
        out: appFields.LINK_HREF
    },
    {
        in: ['id', 'attributes', 'im:id'],
        out: appFields.ID,
        type: 'number',
    },
    {
        in: ['id', 'attributes', 'im:bundleId'],
        out: appFields.BUNDLE_ID
    },
    {
        in: ['im:artist', 'label'],
        out: appFields.ARTIST_LABEL
    },
    {
        in: ['im:artist', 'attributes', 'href'],
        out: appFields.ARTIST_HREF
    },
    {
        in: ['category', 'attributes', 'im:id'],
        out: appFields.CATEGORY_ID,
        type: 'number',
    },
    {
        in: ['category', 'attributes', 'term'],
        out: appFields.CATEGORY_TERM
    },
    {
        in: ['category', 'attributes', 'scheme'],
        out: appFields.CATEGORY_SCHEME
    },
    {
        in: ['category', 'attributes', 'label'],
        out: appFields.CATEGORY_LABEL
    },
    {
        in: ['im:releaseDate', 'label'],
        out: appFields.RELEASE_DATE_TIMESTAMP
    },
    {
        in: ['im:releaseDate', 'attributes', 'label'],
        out: appFields.RELEASE_DATE_LABEL
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