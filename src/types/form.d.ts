export interface LoginData {
  username: string
  password: string
  captcha: string
}
export interface ApplicationCreate {
  type: number
  title: string
  desc: string
}

export interface PageCreate {
  type: number
  title: string
  desc: string
}
export interface BaseResult {
  code: number
  isOk: boolean
  data: Record<string, any>
  msg: string
}
export interface DesignData {
  id: string
  lines: string
  layout: string
  attribute: string
  event: string
  api: string
  page: string
}