import { get, post } from '@/utils/http';

export const getUserInfo = () => get('/api/user/info');

export const listUser = (params: any) => post('/api/user/list', params);

export const addUser = (params: any) => post('/api/user/add', params);

export const getUser = (id: number) => get(`/api/user/get/${id}`);

export const updateUser = (params: any) => post('/api/user/update', params);

export const deleteUser = (id: number) => get(`/api/user/delete/${id}`);
