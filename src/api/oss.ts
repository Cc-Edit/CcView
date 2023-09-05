import { axiosInstance } from '@/utils/axios';
import { BaseResult } from '@/types/form';
// 上传文件
export function uploadFiles(files: File[]): Promise<BaseResult> {
  let size = 0;
  let formData = new FormData();
  files.forEach(file => {
    size += file.size;
    formData.append('files', file);
  });
  if (size > 2048 * 1000) {
    return Promise.reject({ msg: '文件大小超出限制' });
  }
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