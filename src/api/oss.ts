import { axiosInstance } from '@/utils/axios';
import { BaseResult } from '@/types/form';
// 上传文件
export function uploadFiles(files: File[]): Promise<BaseResult> {
  let formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  return axiosInstance.post(`/api/oss/uploadFile`, formData,);
}

// 下载文件
export function getFile(uuid: string) {
  return axiosInstance.get(`/api/oss/getFile`, {
    params: {
      uuid
    }
  });
}