import { FormConfig } from '@/types';

const TemplateForm: FormConfig = {
  title: '登录表单',
  description: '应用登录表单',
  rowData: [
    [
      {
        name: 'username',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '用户名',
          placeholder: '请输入用户名',
          autoComplete: 'username'
        },
        defaultValue: 'admin',
        rules: {
          required: '请输入用户名',
          minLength: { value: 5, message: '用户名长度至少5位' },
          maxLength: { value: 20, message: '用户名长度最多20位' },
          pattern: { value: /^[a-zA-Z0-9_]/, message: '用户名格式不正确' }
        }
      }
    ],
    [
      {
        name: 'desc',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '多行文本',
          multiline: true,
          rows: 5,
          placeholder: '请输入多行文本',
          autoComplete: 'username'
        },
        defaultValue: '',
        rules: { }
      }
    ],
    [
      {
        name: 'filed-1',
        className: 'w-full',
        properties: {
          type: 'text',
          label: '测试前缀后缀 + 无校验条件',
          InputProps: {
            startAdornment: '$',
            endAdornment: '.00'
          },
          placeholder: '请输入'
        },
        defaultValue: '',
        rules: {}
      }
    ],
    [
      {
        name: 'filed-2',
        className: 'w-full',
        properties: {
          type: 'text',
          disabled: true,
          label: '测试默认值+禁用',
          placeholder: '请输入'
        },
        defaultValue: '1111111',
        rules: {}
      }
    ],
    [
      {
        name: 'filed-3',
        className: 'w-1/2 mr-2',
        properties: {
          type: 'text',
          size: 'small',
          variant: 'filled',
          label: '测试filled',
          placeholder: '请输入'
        },
        defaultValue: '',
        rules: {}
      },
      {
        name: 'filed-3-1',
        className: 'w-1/2',
        properties: {
          type: 'text',
          variant: 'standard',
          label: '测试standard + 关联字段',
          placeholder: '请输入'
        },
        defaultValue: '',
        rules: {}
      }
    ],
    [
      {
        name: 'filed-4',
        className: 'w-1/3 mr-2',
        properties: {
          type: 'text',
          fullWidth: true,
          color: 'warning',
          label: '测试filled',
          placeholder: '请输入'
        },
        defaultValue: '',
        rules: {}
      },
      {
        name: 'filed-5',
        className: 'w-1/3 mr-2',
        properties: {
          fullWidth: true,
          type: 'text',
          color: 'success',
          label: '测试filled',
          placeholder: '请输入'
        },
        defaultValue: '',
        rules: {}
      },
      {
        name: 'filed-6',
        className: 'w-1/3 mr-2',
        properties: {
          fullWidth: true,
          type: 'text',
          color: 'secondary',
          label: '测试filled',
          placeholder: '请输入'
        },
        defaultValue: '',
        rules: {}
      }
    ],
    [
      {
        name: 'password',
        component: '',
        className: 'w-full',
        properties: {
          type: 'password',
          label: '密码',
          placeholder: '请输入密码',
          autoComplete: 'current-password'
        },
        defaultValue: 'Aa123123@',
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
        name: 'captcha',
        component: '',
        className: 'w-1/2 mr-2',
        properties: {
          type: 'text',
          label: '验证码',
          placeholder: '请输入图形验证码'
        },
        defaultValue: '',
        rules: {
          required: '请输入验证码',
          minLength: { value: 4, message: '验证码长度至少4位' },
          maxLength: { value: 6, message: '验证码长度最多6位' },
          pattern: { value: /^[a-zA-Z0-9]{4,6}$/, message: '验证码格式不正确' }
        }
      },
      {
        name: 'captcha-image',
        component: 'Capture',
        className: 'w-1/2',
        properties: {
          title: '看不清楚？点击图片更换~',
          enterNextDelay: 500,
          enterDelay: 500,
          placement: 'top',
          arrow: true
        }
      }
    ],
    [
      {
        name: 'select',
        className: 'w-1/2',
        defaultValue: 10,
        properties: {
          type: 'select',
          label: '年龄段',
          options: [
            { value: 10, title: '少年' },
            { value: 30, title: '青年' },
            { value: 50, title: '中年' },
            { value: 70, title: '老年' }
          ]
        }
      },
      {
        name: 'select',
        className: 'w-1/2 ml-2',
        properties: {
          fullWidth: true,
          disabled: true,
          type: 'text',
          label: 'select关联值'
        },
        defaultValue: 10,
        rules: {}
      }
    ],
    [
      {
        name: 'switch',
        className: 'w-1/2',
        defaultValue: true,
        properties: {
          label: 'switch',
          type: 'switch',
          labelPlacement: 'end'
        }
      },
      {
        name: 'switch',
        className: 'w-1/2 ml-2',
        properties: {
          fullWidth: true,
          disabled: true,
          type: 'text',
          label: 'switch关联值'
        },
        defaultValue: true,
        rules: {}
      }
    ],
    [
      {
        name: 'slider',
        className: 'w-1/2',
        defaultValue: 30,
        properties: {
          size: 'small',
          type: 'slider',
          valueLabelDisplay: 'auto',
          step: 10,
          marks: true,
          min: 0,
          max: 100
        }
      },
      {
        name: 'slider',
        className: 'w-1/2 ml-2',
        properties: {
          fullWidth: true,
          disabled: true,
          type: 'text',
          label: 'slider关联值'
        },
        defaultValue: 30,
        rules: {}
      }
    ],
    [
      {
        name: 'slider1',
        className: 'w-1/2',
        defaultValue: 30,
        properties: {
          type: 'slider',
          valueLabelDisplay: 'auto',
          step: 10,
          marks: true,
          min: 0,
          max: 100
        }
      },
      {
        name: 'slider1',
        className: 'w-1/2 ml-2',
        properties: {
          fullWidth: true,
          disabled: true,
          type: 'text',
          label: 'slider关联值'
        },
        defaultValue: 30,
        rules: {}
      }
    ],
    [
      {
        name: 'buttonGroup',
        className: 'w-1/2',
        defaultValue: 30,
        properties: {
          type: 'buttonGroup',
          className: 'ml-20',
          exclusive: true,
          label: '年龄段',
          options: [
            { value: 10, title: '少年' },
            { value: 30, title: '青年' },
            { value: 50, title: '中年' },
            { value: 70, title: '老年' }
          ]
        }
      },
      {
        name: 'buttonGroup',
        className: 'w-1/2 ml-2',
        properties: {
          fullWidth: true,
          disabled: true,
          type: 'text',
          label: 'buttonGroup单选'
        },
        defaultValue: 30,
        rules: {}
      }
    ],
    [
      {
        name: 'buttonGroup1',
        className: 'w-1/2',
        defaultValue: [30, 50],
        properties: {
          type: 'buttonGroup',
          exclusive: false,
          options: [
            { value: 10, title: '少年' },
            { value: 30, title: '青年' },
            { value: 50, title: '中年' },
            { value: 70, title: '老年' }
          ]
        }
      },
      {
        name: 'buttonGroup1',
        className: 'w-1/2 ml-2',
        properties: {
          fullWidth: true,
          disabled: true,
          type: 'text',
          label: 'buttonGroup 多选'
        },
        defaultValue: [30, 50],
        rules: {}
      }
    ],
    [
      {
        name: 'buttonGroup2',
        className: 'w-1/2',
        defaultValue: [30, 50],
        properties: {
          type: 'buttonGroup',
          exclusive: false,
          options: [
            { value: 10, icon: 'Edit' },
            { value: 30, icon: 'Home' },
            { value: 50, icon: 'Source' },
            { value: 70, icon: 'Person' }
          ]
        }
      },
      {
        name: 'buttonGroup2',
        className: 'w-1/2 ml-2',
        properties: {
          fullWidth: true,
          disabled: true,
          type: 'text',
          label: 'buttonGroup 图标'
        },
        defaultValue: [30, 50],
        rules: {}
      }
    ],
    [
      {
        name: 'submit-btn',
        component: 'SubmitButton',
        className: 'w-full',
        properties: {}
      }
    ]
  ]
};
export default TemplateForm;