import {paginated_response_model, user_filter_model, user_model} from '@/models';
import createApiService from './serviceGenerator';

const BACKENDURL = 'https://reqres.in';

export const userApi = () => {
  return createApiService<
    {data: user_model},
    paginated_response_model<user_model>,
    Partial<user_filter_model>,
    Partial<user_model>,
    user_model,
    number
  >(`${BACKENDURL}/api/users`);
};
