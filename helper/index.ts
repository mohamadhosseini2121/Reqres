export const objectToQueryParams = (obj?: any) => {
  if (!obj) return '';
  let params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]: any[]) => {
    if (value !== null && typeof value != 'undefined') {
      if (Array.isArray(value)) {
        if (typeof value === 'object') {
          //obj or array
          value.forEach((v: any) => {
            params.append(key, v);
          });
        }
      } else {
        if (value !== '') params.append(key, value.toString());
      }
    }
  });
  let params_string = params.toString();
  if (params_string.length > 0) params_string = '?' + params_string;
  return params_string;
};
