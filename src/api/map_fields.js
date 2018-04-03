import { appFields, appStoreMetaFields } from ".";

/* Map API fields to used fields */
export const appStoreEntryMap = [
    {
        in: ['im:name', 'label'],
        out: appFields.NAME
    },
    {
        in: ['im:image', 0, 'label'],
        out: appFields.ICON_53
    },
    {
        in: ['im:image', 0, 'attributes', 'height'],
        out: appFields.ICON_53_HEIGHT,
        type: 'number',
    },
    {
        in: ['im:image', 1, 'label'],
        out: appFields.ICON_75
    },
    {
        in: ['im:image', 1, 'attributes', 'height'],
        out: appFields.ICON_75_HEIGHT,
        type: 'number',
    },
    {
        in: ['im:image', 2, 'label'],
        out: appFields.ICON_100
    },
    {
        in: ['im:image', 2, 'attributes', 'height'],
        out: appFields.ICON_100_HEIGHT,
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
        out: appFields.LINK_URL
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
        out: appFields.ARTIST_URL
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

export const appLookUpMap = [
    {
        in: 'trackId',
        out: appFields.ID,
    },
    { inOut: appFields.IS_GAME_CENTER_ENABLED },
    { inOut: appFields.SCREENSHOT_URLS },
    { inOut: appFields.IPAD_SCREENSHOT_URLS },
    { inOut: appFields.APPLE_TV_SCREENSHOT_URLS },
    {
        in: ['artworkUrl60'],
        out: appFields.ICON_60,
        add: { [appFields.ICON_60_HEIGHT]: 60 },
    },
    {
        in: ['artworkUrl512'],
        out: appFields.ICON_512,
        add: { [appFields.ICON_512_HEIGHT]: 512 },
    },
    { inOut: appFields.FEATURES },
    { inOut: appFields.ADVISORIES },
    { inOut: appFields.SUPPORTED_DEVICES },
    { inOut: appFields.AVG_USER_RATING, type: 'number' },
    { inOut: appFields.LANG_CODES },
    { inOut: appFields.FILE_SIZE_BYTES, type: 'number' },
    { inOut: appFields.CONTENT_ADVISORY_RATING },
    { inOut: appFields.USER_RATING_COUNT, type: 'number' },
    { inOut: appFields.TRACK_CONTENT_RATING },
    { inOut: appFields.SELLER_NAME },
    { inOut: appFields.GENRE_IDS, type: 'number' },
    { inOut: appFields.GENRES },
    { inOut: appFields.MIN_OS_VERSION },
    { inOut: appFields.VERSION },
    { inOut: appFields.IS_VPP_DEVICE_BASED_LICENSING_ENABLED },
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
        out: appStoreMetaFields.ICON_53,
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
        out: appStoreMetaFields.LINK_URL
    },
];