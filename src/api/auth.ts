import { axiosInstance } from '@/utils/axios';
import { BaseResult, LoginData } from '@/types/form';

// 图形验证码
export function getCaptcha(params: { w?: number, h?: number }): Promise<Record<string, any>> {
  return axiosInstance.get(`/api/auth/captcha?w=${params.w}&h=${params.h}`);
}

// 登录
export function login(data: LoginData & { captureEncode: string }): Promise<BaseResult> {
  return axiosInstance.post(`/api/auth/login`, data);
}

// 注销
export function logout() {
  return axiosInstance.get(`/api/auth/logout`);
}