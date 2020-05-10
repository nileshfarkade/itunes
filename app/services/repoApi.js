import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('iTunes');

export const getRepos = repoName =>
  repoApi.get(`/search?term=${repoName}`);
