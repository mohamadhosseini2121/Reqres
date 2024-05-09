import {ReadonlyURLSearchParams} from 'next/navigation';

export function getCookie(cname: string) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function eraseCookie(cname: string) {
  document.cookie = cname + '=; Max-Age=-99999999;';
}

export function truncateWithEllipses(text: string, max: number) {
  if (!text || !max) return;
  if (text.length > max) return text.slice(0, max) + '...';
  return text;
}

export function cloneDeep<T>(object: T): T {
  //@ts-ignore
  if (object == null) return null;
  return JSON.parse(JSON.stringify(object));
}

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

export function objectToFormData(obj: any): FormData {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });
  return formData;
}
