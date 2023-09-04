import { FormConfig } from '@/types';

const CreatePage: FormConfig = {
  title: '创建页面',
  description: '创建页面',
  rowData: [
    [
      {
        name: 'title',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '页面名称',
          placeholder: '请输入页面名称'
        },
        defaultValue: '',
        rules: {
          required: '请输入页面名称',
          minLength: { value: 2, message: '页面名称长度至少2位' },
          maxLength: { value: 10, message: '页面名称长度最多10位' }
        }
      }
    ],
    [
      {
        name: 'desc',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '页面说明',
          multiline: true,
          rows: 5,
          placeholder: '请输入页面说明'
        },
        defaultValue: '',
        rules: {
          maxLength: { value: 100, message: '页面说明长度最多100位' }
        }
      }
    ],
    [
      {
        name: 'cancel',
        component: 'CancelButton',
        className: 'w-1/2 px-2',
        properties: {
          buttonText: '取消'
        }
      },
      {
        name: 'submit-btn',
        component: 'SubmitButton',
        className: 'w-1/2 px-2',
        properties: {
          buttonText: ['保存中...', '保存']
        }
      }
    ]
  ]
};
export default CreatePage;