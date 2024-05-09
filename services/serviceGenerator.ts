import {objectToQueryParams} from '@/helper';

type IsNeverOrUndefined<T> = T extends never | undefined ? true : false;

type NonNeverOrUndefinedProperties<T> = {
  [K in keyof T]: T[K] extends never | undefined ? never : K;
}[keyof T];

type Service<
  GetByIdOutputType,
  GetListOutputType,
  GetListFilterType,
  SaveInputType,
  SaveOutputType,
  RemoveOutputType
> = {
  getById: IsNeverOrUndefined<GetByIdOutputType> extends true
    ? never
    : (id: number) => Promise<GetByIdOutputType>;
  getList: IsNeverOrUndefined<GetListOutputType> extends true
    ? never
    : (filter?: GetListFilterType) => Promise<GetListOutputType>;
  save: IsNeverOrUndefined<SaveInputType> extends true
    ? never
    : (item: SaveInputType) => Promise<SaveOutputType>;
  remove: IsNeverOrUndefined<RemoveOutputType> extends true
    ? never
    : (id: number) => Promise<RemoveOutputType>;
};

type MyService<
  GetByIdOutputType,
  GetListOutputType,
  GetListFilterType,
  SaveInputType,
  SaveOutputType,
  RemoveOutputType
> = Pick<
  Service<
    GetByIdOutputType,
    GetListOutputType,
    GetListFilterType,
    SaveInputType,
    SaveOutputType,
    RemoveOutputType
  >,
  NonNeverOrUndefinedProperties<
    Service<
      GetByIdOutputType,
      GetListOutputType,
      GetListFilterType,
      SaveInputType,
      SaveOutputType,
      RemoveOutputType
    >
  >
>;

const createApiService = <
  GetByIdOutputType = never,
  GetListOutputType = never,
  GetListFilterType = never,
  SaveInputType extends object = never,
  SaveOutputType = never,
  RemoveOutputType = never
>(
  endpoint: string,
  getToken?: string | null
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: getToken || '',
  };

  const fetchRequest = async (url: string, method: string, body?: string) => {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        JSON.stringify({
          status: response.status,
          body: errorBody,
        })
      );
    }
    if (response.status !== 204) return await response.json();
  };

  const service: MyService<
    GetByIdOutputType,
    GetListOutputType,
    GetListFilterType,
    SaveInputType,
    SaveOutputType,
    RemoveOutputType
  > = {} as any;

  // @ts-ignore
  service.getById = async (id: number): Promise<GetByIdOutputType> => {
    return fetchRequest(`${endpoint}/${id}`, 'GET');
  };
  // @ts-ignore
  service.getList = async (filter?: GetListFilterType): Promise<GetListOutputType> => {
    const queryString = filter ? objectToQueryParams(filter) : '';
    return fetchRequest(`${endpoint}/${queryString}`, 'GET');
  };
  // @ts-ignore
  service.save = async (item: SaveInputType): Promise<SaveOutputType> => {
    const method =
      'id' in item && item.id && typeof item.id === 'number' && item.id >= 0 ? 'PATCH' : 'POST';
    const url = method === 'PATCH' && 'id' in item ? `${endpoint}/${item.id}/` : `${endpoint}/`;
    return fetchRequest(url, method, JSON.stringify(item));
  };
  // @ts-ignore
  service.remove = async (id: number): Promise<RemoveOutputType> => {
    return fetchRequest(`${endpoint}/${id}`, 'DELETE');
  };

  return service;
};

export default createApiService;
