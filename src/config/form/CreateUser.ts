import { FormConfig } from '@/types';

export const CreateUser: FormConfig = {
  title: '创建用户',
  description: '创建用户',
  rowData: [
    [
      {
        name: 'name',
        className: 'w-1/2 shrink-0 mb-6',
        properties: {
          type: 'text',
          label: '用户名',
          placeholder: '请输入用户名'
        },
        defaultValue: '',
        rules: {
          required: '请输入用户名',
          minLength: { value: 5, message: '用户名长度至少5位' },
          maxLength: { value: 20, message: '用户名长度最多20位' },
          pattern: { value: /^[a-zA-Z0-9_]/, message: '用户名格式不正确' }
        }
      },
      {
        name: 'avatar',
        className: 'w-1/2 shrink-0 h-20',
        properties: {
          type: 'Avatar'
        },
        defaultValue: '',
        rules: {
          required: '头像地址不能为空'
        }
      },
      {
        name: 'role',
        className: 'w-1/2 shrink-0',
        defaultValue: 1,
        properties: {
          type: 'select',
          label: '用户角色',
          options: [
            { value: 0, title: '管理员' },
            { value: 1, title: '用户' }
          ]
        }
      }
    ],
    [
      {
        name: 'password',
        className: 'w-full',
        properties: {
          type: 'password',
          label: '密码',
          placeholder: '请输入密码'
        },
        defaultValue: '',
        rules: {
          required: '请输入密码',
          minLength: { value: 6, message: '密码长度至少6位' },
          maxLength: { value: 30, message: '密码长度最多30位' },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,30}$/,
            message: '密码中必须包含字母、数字和特殊字符'
          }
        }
      }
    ],
    [
      {
        name: 'phone',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '手机号',
          placeholder: '请输入手机号'
        },
        defaultValue: '',
        rules: {
          required: '请输入手机号',
          pattern: { value: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/, message: '手机号格式不正确' }
        }
      }
    ],
    [
      {
        name: 'email',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '邮箱地址',
          placeholder: '请输入邮箱地址'
        },
        defaultValue: '',
        rules: {
          required: '请输入邮箱地址',
          pattern: { value: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱地址格式不正确' }
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
          buttonText: ['创建中...', '创建']
        }
      }
    ]
  ]
};
export const UpdateUser: FormConfig = {
  title: '更新用户',
  description: '更新用户',
  rowData: [
    [
      {
        name: 'name',
        className: 'w-1/2 shrink-0 mb-6',
        properties: {
          type: 'text',
          label: '用户名',
          placeholder: '请输入用户名'
        },
        defaultValue: '',
        rules: {
          required: '请输入用户名',
          minLength: { value: 5, message: '用户名长度至少5位' },
          maxLength: { value: 20, message: '用户名长度最多20位' },
          pattern: { value: /^[a-zA-Z0-9_]/, message: '用户名格式不正确' }
        }
      },
      {
        name: 'avatar',
        className: 'w-1/2 shrink-0 h-20',
        properties: {
          type: 'Avatar'
        },
        defaultValue: '',
        rules: {
          required: '头像地址不能为空'
        }
      },
      {
        name: 'role',
        className: 'w-1/2 shrink-0',
        defaultValue: 1,
        properties: {
          type: 'select',
          label: '用户角色',
          options: [
            { value: 0, title: '管理员' },
            { value: 1, title: '用户' }
          ]
        }
      }
    ],
    [
      {
        name: 'password',
        className: 'w-full',
        properties: {
          type: 'password',
          label: '密码',
          placeholder: '不输入内容则保持旧密码使用'
        },
        defaultValue: '',
        rules: {
          minLength: { value: 6, message: '密码长度至少6位' },
          maxLength: { value: 30, message: '密码长度最多30位' },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,30}$/,
            message: '密码中必须包含字母、数字和特殊字符'
          }
        }
      }
    ],
    [
      {
        name: 'phone',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '手机号',
          placeholder: '请输入手机号'
        },
        defaultValue: '',
        rules: {
          required: '请输入手机号',
          pattern: { value: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/, message: '手机号格式不正确' }
        }
      }
    ],
    [
      {
        name: 'email',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '邮箱地址',
          placeholder: '请输入邮箱地址'
        },
        defaultValue: '',
        rules: {
          required: '请输入邮箱地址',
          pattern: { value: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱地址格式不正确' }
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
          buttonText: ['更新中...', '更新']
        }
      }
    ]
  ]
};
export default CreateUser;