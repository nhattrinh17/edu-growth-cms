import { BaseAxios } from '@/lib';

export const fetchUserInfo = () => {
  const axios = new BaseAxios();
  return axios.get('auth/userInfo');
};

export const getAllSubject = (page: number, limit: number) => {
  const axios = new BaseAxios();
  let url = 'subject?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  return axios.get(url);
};

export const createSubject = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('subject', data);
};

export const updateSubject = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`subject/${id}`, data);
};

export const getAllEduLevel = (page: number, limit: number) => {
  const axios = new BaseAxios();
  let url = 'edu-level?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  return axios.get(url);
};

export const createEduLevel = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('edu-level', data);
};

export const updateEduLevel = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`edu-level/${id}`, data);
};

export const getAllLocation = (page: number, limit: number) => {
  const axios = new BaseAxios();
  let url = 'location?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  return axios.get(url);
};

export const createLocation = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('location', data);
};

export const updateLocation = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`location/${id}`, data);
};

export const getAllClasses = (page: number, limit: number, subjectId: number[], eduLevelId: number[], require: number[], locationId: number[], statusClass?: number) => {
  const axios = new BaseAxios();
  let url = 'class/cms?';
  if (page) url += 'page=' + page;
  if (limit) url += '&limit=' + limit;
  if (statusClass) url += '&status=' + statusClass;
  subjectId.forEach((i) => (url += `&subjectId=${i}`));
  eduLevelId.forEach((i) => (url += `&eduLevelId=${i}`));
  require.forEach((i) => (url += `&require=${i}`));
  locationId.forEach((i) => (url += `&locationId=${i}`));
  return axios.get(url);
};

export const getClassById = (id: number) => {
  const axios = new BaseAxios();
  return axios.get(`class/${id}/cms`);
};

export const createClass = (data: any) => {
  const axios = new BaseAxios();
  return axios.post('class', data);
};

export const updateClass = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`class/${id}`, data);
};

export const updateStatusClass = (id: number, data: any) => {
  const axios = new BaseAxios();
  return axios.patch(`class/${id}/status`, data);
};

export const deleteClassById = (id: number) => {
  const axios = new BaseAxios();
  return axios.delete(`class/${id}`);
};
