import { axiosInstance } from '@/utils/axios';
import { User } from '@/types';
import { BaseResult } from '@/types/form';
export type CreateUser = User | {
  phone: string,
  avatar: string,
  uuid?: string,
  password: string
}
// 创建用户
export function createUser(data: CreateUser): Promise<BaseResult> {
  return axiosInstance.post(`/api/user/creat`, data);
}

// 创建用户
export function updateUser(data: CreateUser): Promise<BaseResult> {
  return axiosInstance.post(`/api/user/update`, data);
}

// 禁用用户
export function updateUserStatus(data: {uuid: string, status: number}): Promise<BaseResult> {
  return axiosInstance.post(`/api/user/updateUserStatus`, data);
}

// 获取用户列表
export function getUserList(query: Record<string, any>): Promise<BaseResult & {data: Record<string, any>[]}> {
  return axiosInstance.post(`/api/user/list`, query);
}

// 获取用户信息
export function getUserInfo(data = {}): Promise<BaseResult & { data: User }> {
  return axiosInstance.post(`/api/user/findByUuid`, data);
}
