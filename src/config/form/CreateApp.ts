import { FormConfig } from '@/types';

const CreateApp: FormConfig = {
  title: '创建应用',
  description: '创建应用',
  rowData: [
    [
      {
        name: 'title',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '应用名称',
          placeholder: '请输入应用名称'
        },
        defaultValue: '',
        rules: {
          required: '请输入应用名称',
          minLength: { value: 2, message: '应用名称长度至少2位' },
          maxLength: { value: 10, message: '应用名称长度最多10位' }
        }
      }
    ],
    [
      {
        name: 'desc',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '应用说明',
          multiline: true,
          rows: 5,
          placeholder: '请输入应用说明'
        },
        defaultValue: '',
        rules: {
          maxLength: { value: 100, message: '应用说明长度最多100位' }
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
export default CreateApp;