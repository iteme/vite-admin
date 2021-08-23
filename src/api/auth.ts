import { get, post } from '@/utils/http';

export const authQrLogin = (params: unknown) => post('/api/auth/qrLogin', params);

export const authLogout = () => get('/api/auth/logout');

export const getQrUrl = () => get('/api/auth/qrUrl');
