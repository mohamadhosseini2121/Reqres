// import {user_model , user_filter_model, paginated_response_model} from "@/models";
// import axios from 'axios';
// import {filter_model_to_url_search_params_string} from '../../helper';


// export const getUsers = async (filters?: user_filter_model): Promise<getUsersResponse> => {
//   const params = filter_model_to_url_search_params_string(filters);
//   let res = await axios.get(`${process.env.REACT_APP_BACKENDURL}/basic/user_api/${params}`);
//   return res.data;
// };

// export const getUser = (id: number) => {
//   return axios
//     .get(process.env.REACT_APP_BACKENDURL + '/basic/user_api/' + id + '/')
//     .then(function (response) {
//       const user = response.data;
//       return user;
//     })
//     .catch(function (error) {
//       return null;
//     });
// };

// export const removeUser = async (id: number) => {
//   const response = await axios.delete(
//     process.env.REACT_APP_BACKENDURL + '/basic/user_api/' + id + '/'
//   );
//   return response;
// };
// export const saveUser = async (user: Partial<user_model>) => {
//   let response;
//   if (user.id && user.id >= 0) {
//     response = await axios.patch(
//       process.env.REACT_APP_BACKENDURL + '/basic/user_api/' + user.id + '/',
//       user
//     );
//   } else {
//     response = await axios.post(process.env.REACT_APP_BACKENDURL + '/basic/user_api/', user);
//   }
//   return response.data;
// };
// export const saveUserData = async (formData: FormData) => {
//   let response;
//   let id = formData.get('id');
//   if (id && !(id instanceof File) && Number(id) >= 0) {
//     response = await axios.patch(
//       process.env.REACT_APP_BACKENDURL + '/basic/user_api/' + id + '/',
//       formData
//     );
//   } else {
//     response = await axios.post(process.env.REACT_APP_BACKENDURL + '/basic/user_api/', formData);
//   }
//   return response.data;
// };
