import { getAxiosInstance } from '../lib/api/index';

const axios = getAxiosInstance();

axios.defaults.baseURL = process.env.REACT_APP_APPSTORE_API_BASE_URL || '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';