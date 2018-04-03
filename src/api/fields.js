/* The fields to be converted to or used */
export const appFields = {
    // RSS Entry fields
    NAME: 'name',
    ICON_53: 'icon53',
    ICON_53_HEIGHT: 'icon53Height',
    ICON_75: 'icon75',
    ICON_75_HEIGHT: 'icon75Height',
    ICON_100: 'icon100',
    ICON_100_HEIGHT: 'icon100Height',
    SUMMARY: 'summary',
    PRICE_LABEL: 'priceLabel',
    PRICE_AMOUNT: 'priceAmount',
    PRICE_CURRENCY: 'priceCurrency',
    CONTENT_TYPE_TERM: 'contentTypeTerm',
    CONTENT_TYPE_LABEL: 'contentTypeLabel',
    RIGHTS: 'rights',
    TITLE: 'title',
    LINK_REL: 'linkRel',
    LINK_TYPE: 'linkType',
    LINK_URL: 'linkUrl',
    ID: 'id',
    BUNDLE_ID: 'bundleId',
    ARTIST_LABEL: 'artistLabel',
    ARTIST_URL: 'artistUrl',
    CATEGORY_ID: 'categoryId', // == primary genre
    CATEGORY_TERM: 'categoryTerm',
    CATEGORY_SCHEME: 'categoryScheme',
    CATEGORY_LABEL: 'categoryLabel',
    RELEASE_DATE_TIMESTAMP: 'releaseDateTimestamp',
    RELEASE_DATE_LABEL: 'releaseDateLabel',
    // App Lookup fields
    IS_GAME_CENTER_ENABLED: 'isGameCenterEnabled',
    SCREENSHOT_URLS: 'screenshotUrls',
    IPAD_SCREENSHOT_URLS: 'ipadScreenshotUrls',
    APPLE_TV_SCREENSHOT_URLS: 'appletvScreenshotUrls',
    ICON_60: 'icon60',
    ICON_60_HEIGHT: 'icon60Height',
    ICON_512: 'icon512',
    ICON_512_HEIGHT: 'icon512Height',
    FEATURES: 'features',
    ADVISORIES: 'advisories',
    SUPPORTED_DEVICES: 'supportedDevices',
    AVG_USER_RATING: 'averageUserRatingForCurrentVersion',
    LANG_CODES: 'languageCodesISO2A',
    FILE_SIZE_BYTES: 'fileSizeBytes',
    CONTENT_ADVISORY_RATING: 'contentAdvisoryRating',
    USER_RATING_COUNT: 'userRatingCountForCurrentVersion',
    TRACK_CONTENT_RATING: 'trackContentRating',
    SELLER_NAME: 'sellerName',
    GENRE_IDS: 'genreIds',
    GENRES: 'genres',
    MIN_OS_VERSION: 'minimumOsVersion',
    VERSION: 'version',
    IS_VPP_DEVICE_BASED_LICENSING_ENABLED: 'isVppDeviceBasedLicensingEnabled',
};

export const appStoreMetaFields = {
    STORE_NAME: 'storeName',
    STORE_URI: 'storeUri',
    LAST_UPDATE: 'lastUpdate',
    RIGHTS: 'rights',
    TITLE: 'title',
    ICON_53: 'icon',
    LINK_REL: 'linkRel',
    LINK_TYPE: 'linkType',
    LINK_URL: 'linkUrl',
}