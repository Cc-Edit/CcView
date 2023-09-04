import { FormConfig } from '@/types';

const LoginForm: FormConfig = {
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
        defaultValue: 'Guest',
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
        name: 'password',
        component: '',
        className: 'w-full',
        properties: {
          type: 'password',
          label: '密码',
          placeholder: '请输入密码',
          autoComplete: 'current-password'
        },
        defaultValue: 'Aa123465@',
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
        className: 'w-1/2 pr-1',
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
        className: 'w-1/2 pl-1',
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
        name: 'submit-btn',
        component: 'SubmitButton',
        className: 'w-full',
        properties: {}
      }
    ]
  ]
};
export default LoginForm;