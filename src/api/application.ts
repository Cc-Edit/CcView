import { axiosInstance } from '@/utils/axios';
import { BaseResult, PageCreate, ApplicationCreate } from '@/types/form';

export function creatApp(data: ApplicationCreate, parent: string): Promise<BaseResult> {
  return axiosInstance.post(`/api/page/creatFolder`, {
    ...data,
    parent,
    type: 1
  });
}

export function creatPage(data: PageCreate, parent: string): Promise<BaseResult> {
  return axiosInstance.post(`/api/page/creatPage`, {
    ...data,
    parent,
    type: 0
  });
}

export function updateApp(data: ApplicationCreate): Promise<BaseResult> {
  return axiosInstance.post(`/api/page/update`, {
    ...data,
    type: 1
  });
}

export function updatePage(data: PageCreate): Promise<BaseResult> {
  return axiosInstance.post(`/api/page/update`, {
    ...data,
    type: 0
  });
}

export function deleteAppOrPage(uuid: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/page/delete`, {
    params: {
      uuid
    }
  });
}

export function copyAppOrPage(uuid: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/page/copy`, {
    params: {
      uuid
    }
  });
}

export function movePage(origin: string, target: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/page/move`, {
    params: {
      target,
      origin
    }
  });
}

export function getFolder(uuid: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/page/getFolder`, {
    params: {
      uuid
    }
  });
}
export function getDetail(uuid: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/page/getPage`, {
    params: {
      uuid
    }
  });
}