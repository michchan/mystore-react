import _ from 'lodash';

export const findStringIgnoreCase = (string = '', searchTerms = '') => {
    return _.toLower(string).includes(_.toLower(searchTerms));
}