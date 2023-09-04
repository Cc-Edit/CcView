export const Domain = {
  baseURL: process.env.NEXT_PUBLIC_BASEURL
};
// 全局常量
export const Constant = {
  TokenKey: 'access_token',
  CaptureEncode: 'cpt_en',
  Uid: 'uid',
  ThemeKey: 'theme'
};
// 文件类型
export const FileTypeMap = {
  bpm: 'image/bpm',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp3: 'audio/mp3',
  mp4: 'video/mpeg4',
  aac: 'audio/x-mei-aac'
};

export const HideMenuList = [
  '/login',
  '/design',
  '/preview',
  '/template',
  '/404',
  '/500'
];
export const HideHeadList = HideMenuList;
export function isHideMenu(isHead = false, path: string) {
  return Boolean((isHead ? HideHeadList : HideMenuList).find(route => path.indexOf(route) > -1));
}