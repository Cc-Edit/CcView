import { axiosInstance } from '@/utils/axios';
import { DesignData, BaseResult } from '@/types/form';

// 保存设计
export function saveDesign(data: DesignData): Promise<BaseResult> {
  return axiosInstance.post(`/api/design/saveDesign`, {
    ...data
  });
}
// 获取设计
export function getDesign(id: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/design/getDesign`, {
    params: {
      id
    }
  });
}