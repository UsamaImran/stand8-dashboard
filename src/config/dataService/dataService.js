import axios from 'axios';
import store from '../../redux/store';
import { getItem } from '../../utility/localStorageControl';
import { logOut } from '../../redux/authentication/actionCreator';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const authHeader = () => ({
  Authorization: `Bearer ${getItem('access_token')}`,
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
});

class DataService {
  static get(type = 'backend', path = '', params) {
    return (
      type === 'backend' &&
      client({
        method: 'GET',
        url: path,
        headers: { ...authHeader() },
        params,
      })
    );
  }

  static post(type = 'backend', path = '', data = {}, optionalHeader = {}) {
    return (
      type === 'backend' &&
      client({
        method: 'POST',
        url: path,
        data,
        headers: { ...authHeader(), ...optionalHeader },
      })
    );
  }

  static patch(type = 'backend', path = '', data = {}) {
    return (
      type === 'backend' &&
      client({
        method: 'PATCH',
        url: path,
        data: JSON.stringify(data),
        headers: { ...authHeader() },
      })
    );
  }

  static put(type = 'backend', path = '', data = {}) {
    return (
      type === 'backend' &&
      client({
        method: 'PUT',
        url: path,
        data: JSON.stringify(data),
        headers: { ...authHeader() },
      })
    );
  }

  static delete(type = 'backend', path = '', data = {}) {
    return (
      type === 'backend' &&
      client({
        method: 'DELETE',
        url: path,
        data: JSON.stringify(data),
        headers: { ...authHeader() },
      })
    );
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use(config => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers, Authorization: `Bearer ${getItem('access_token')}` };

  return requestConfig;
});

client.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response.status === 401) {
      store.dispatch(logOut(true));
    }
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    return Promise.reject(response);
  },
);
export { DataService };

/**
 * Dont remove this old code
 */
// import axios from 'axios';
// import { getItem } from '../../utility/localStorageControl';

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
// const ASANA_API_ENDPOINT = process.env.REACT_APP_ASANA_API_ENDPOINT;
// const ASANA_API_TOKEN = process.env.REACT_APP_ASANA_API_TOKEN;

// const authHeader = (token = getItem('access_token')) => ({
//   Authorization: `Bearer ${token}`,
// });

// class ApiBase {
//   constructor(uri, token = getItem('access_token')) {
//     this.baseURL = uri;
//     this.client = axios.create({
//       baseURL: this.baseURL,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     /**
//      * axios interceptors runs before and after a request, letting the developer modify req,req more
//      * For more details on axios interceptor see https://github.com/axios/axios#interceptors
//      */

//     this.client.interceptors.request.use(config => {
//       // do something before executing the request
//       // For example tag along the bearer access token to request header or set a cookie
//       const requestConfig = config;
//       const { headers } = config;
//       requestConfig.headers = { ...headers, Authorization: `Bearer ${token}` };

//       return requestConfig;
//     });

//     this.client.interceptors.response.use(
//       response => response,
//       error => {
//         /**
//          * Do something in case the response returns an error code [3**, 4**, 5**] etc
//          * For example, on token expiration retrieve a new access token, retry a failed request etc
//          */
//         const { response } = error;
//         if (response) {
//           if (response.status === 500) {
//             // do something here
//           }
//         }
//         return Promise.reject(response);
//       },
//     );
//   }
// }

// const backendClient = new ApiBase(API_ENDPOINT);
// const asanaClient = new ApiBase(`${ASANA_API_ENDPOINT}`, ASANA_API_TOKEN);

// class DataService {
//   static get(type = 'backend', path = '', params) {
//     const clinetFn = type === 'asana' ? asanaClient.client : backendClient.client;
//     return clinetFn({
//       method: 'GET',
//       url: path,
//       headers: { ...authHeader() },
//       params,
//     });
//   }

//   static post(type = 'backend', path = '', data = {}, optionalHeader = {}) {
//     const clinetFn = type === 'asana' ? asanaClient.client : backendClient.client;
//     return clinetFn({
//       method: 'POST',
//       url: path,
//       data,
//       headers: { ...authHeader(), ...optionalHeader },
//     });
//   }

//   static patch(type = 'backend', path = '', data = {}) {
//     const clinetFn = type === 'asana' ? asanaClient.client : backendClient.client;
//     return clinetFn({
//       method: 'PATCH',
//       url: path,
//       data: JSON.stringify(data),
//       headers: { ...authHeader() },
//     });
//   }

//   static put(type = 'backend', path = '', data = {}) {
//     const clinetFn = type === 'asana' ? asanaClient.client : backendClient.client;
//     return clinetFn({
//       method: 'PUT',
//       url: path,
//       data: JSON.stringify(data),
//       headers: { ...authHeader() },
//     });
//   }

//   static delete(type = 'backend', path = '', data = {}) {
//     const clinetFn = type === 'asana' ? asanaClient.client : backendClient.client;
//     return clinetFn({
//       method: 'DELETE',
//       url: path,
//       data: JSON.stringify(data),
//       headers: { ...authHeader() },
//     });
//   }
// }
// export { DataService };
