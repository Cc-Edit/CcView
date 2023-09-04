import { axiosInstance } from '@/utils/axios';
import { BaseResult } from '@/types/form';

// 保存页面模板
export function savaPageTemplate(data: {name: string, cover: string, originId: string}): Promise<BaseResult> {
  return axiosInstance.post(`/api/template/saveTemplate`, {
    ...data,
    type: 0
  });
}
// 保存组件模板
export function savaComponentTemplate(data: {name: string, cover: string, templateStr: string}): Promise<BaseResult> {
  return axiosInstance.post(`/api/template/saveTemplate`, {
    ...data,
    type: 1
  });
}
// 删除模板
export function deleteTemplate(uuid: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/template/delete`, {
    params: {
      uuid
    }
  });
}

// 模板数据
export function getTemplate(uuid: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/template/getTemplate`, {
    params: {
      uuid
    }
  });
}

// 模板列表
export function getTemplateList(type = 0): Promise<BaseResult> {
  return axiosInstance.get(`/api/template/list`, {
    params: {
      type
    }
  });
}

// 基于模板创建页面
export function createTemplatePage(uuid: string): Promise<BaseResult> {
  return axiosInstance.get(`/api/template/createTemplatePage`, {
    params: {
      uuid
    }
  });
}
