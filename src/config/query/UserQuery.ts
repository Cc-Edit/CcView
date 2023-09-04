import { QueryConfig } from '@/types';
import { dateFormat } from '@/utils/common';

const UserStatus = ['已删除', '已禁用', '正常'];
const UserStatusColor = ['text-red-500', 'text-orange-500', ''];
const UserRole = ['管理员', '用户'];

const UserQuery: QueryConfig = {
  tableConfig: {
    columns: [
      { key: 'user', label: '用户', component: 'User', align: 'center', minWidth: 240 },
      { key: 'role', label: '用户角色', align: 'center', format: (value: number) => UserRole[value] },
      { key: 'status', label: '用户状态', align: 'center', getClass: (value: number) => UserStatusColor[value], format: (value: number) => UserStatus[value] },
      { key: 'createDate', label: '创建日期', format: (value: number) => dateFormat(value, 'Y-M-D h:m:s') },
      { key: 'updateDate', label: '最后更新日期', format: (value: number) => dateFormat(value, 'Y-M-D h:m:s') },
      { key: 'options', label: '操作', component: 'UserOptions', align: 'center', minWidth: 120 }
    ]
  },
  layout: [
    [
      {
        type: 'Tab',
        className: 'flex-1',
        mapping: { key: 'status' },
        properties: {
          defaultValue: -1,
          options: [
            { value: -1, label: '全部' },
            { value: 2, label: '正常' },
            { value: 1, label: '已禁用' },
            { value: 0, label: '已删除' }
          ]
        }
      },
      {
        type: 'Button',
        className: 'w-22',
        properties: {
          label: '新增用户',
          variant: 'outlined',
          startIcon: 'PersonAdd',
          eventName: 'handleCreat'
        }
      }
    ],
    [
      {
        type: 'String',
        mapping: { key: 'info' },
        className: 'w-120 mr-4',
        properties: {
          label: '用户信息',
          placeholder: '模糊查询用户名、邮箱、手机号'
        }
      },
      {
        type: 'Select',
        className: 'w-52 mr-4',
        mapping: { key: 'role' },
        properties: {
          label: '用户角色',
          defaultValue: -1,
          options: [
            { value: -1, label: '全部' },
            { value: 0, label: '管理员' },
            { value: 1, label: '用户' }
          ]
        }
      },
      {
        type: 'DateRange',
        className: 'w-110',
        mapping: { key: 'createDate' },
        properties: {
          label: '创建时间',
          format: 'YYYY-MM-DD'
        }
      },
      {
        type: 'Button',
        className: 'w-22',
        properties: {
          label: '重置',
          variant: 'outlined',
          startIcon: 'DeleteSweep',
          eventName: 'resetQuery'
        }
      }
    ]
  ]
};
export default UserQuery;