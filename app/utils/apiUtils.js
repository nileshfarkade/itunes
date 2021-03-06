import { create } from 'apisauce';
import mapKeysDeep from 'map-keys-deep';
import { camelCase, snakeCase } from 'lodash';

const { GITHUB_URL } = process.env;
const iTunes_URL = 'https://itunes.apple.com/';
const apiClients = {
  github: null,
  iTunes: null,
  default: null
};
export const getApiClient = (type = 'iTunes') => apiClients[type];
export const generateApiClient = (type = 'iTunes') => {
 
  switch (type) {
    case 'github':
      apiClients[type] = createApiClientWithTransForm(GITHUB_URL);
      return apiClients[type];
    case 'iTunes':
      apiClients[type] = createApiClientWithTransForm(iTunes_URL);
      return apiClients[type];  
    default:
      apiClients.default = createApiClientWithTransForm(GITHUB_URL);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform(response => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, keys => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform(request => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys));
    }
    return request;
  });
  return api;
};
