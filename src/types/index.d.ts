import { ControllerRenderProps, ControllerFieldState, UseFormResetField, Control } from 'react-hook-form';
import { ForwardedRef } from 'react';
export interface User {
  avatar: string
  email: string
  name: string
  role: number
  status: number
}

export interface MenuType {
  key: string
  icon?: string
  title: string
  contentTitle?: string
  href?: string
  childKey?: string[]
  child?: MenuType[]
}
export interface PageData {
  title: string
  uuid: string
  createDate: number | string
  cover: string
  createUser: User
  type: number
  publish: number
  status: number
}
export type ApplicationData = Pick<PageData, 'title'|'createDate'|'createUser'|'type'|'uuid'>

export interface FormConfigItem {
  name: string
  component?: string
  className?: string
  properties: Record<string, any>
  defaultValue?: any
  rules?: Record<string, any>
}

export interface FormConfig {
  title: string
  description: string
  rowClass?: string
  rowData: FormConfigItem[][]
}
export interface QueryItem {
  type: string
  className?: string
  mapping?: Record<string, any>
  properties: Record<string, any>
}
export interface QueryConfig {
  layout: QueryItem[][]
  tableConfig: {
    columns: Record<string, any>[]
  }
}
export interface FormItemTempProp {
  config: FormConfigItem
  field: ControllerRenderProps
  fieldState: ControllerFieldState
}
type FormControl = {
  control: Control
  resetField: UseFormResetField<Record<string, any>>
}
export interface EventParams {
  type: string,
  isUpdate: boolean,
  data: Record<string, any>,
  form: FormControl,
  refs: Record<string, ForwardedRef>
}
export interface MoreMenuEvent {
  title: string
  cover?: string
  type: number
  eventType: string
  uuid: string
}
export interface MenuContent {
  component: string
  props?: Record<string, any>
}
export interface MenuItem {
  key: string,
  title?: string,
  desc?: string,
  tooltip?: string,
  icon?: string,
  children?:MenuContent | MenuContent[]
}
export interface AttributeItem {
  type: string
  props?: Record<string, any>
  mapping?: Record<string, any>
}
export interface ComponentConfig {
  stickyRows: number[]
  attributes: AttributeItem[][]
}
export interface dataConfigProp {
  type: 'static' | 'api',
  request: {
    url: string
    method: 'post' | 'get'
    options: Record<string, any>
    resultKey: string
  }
  data?: any[]
}