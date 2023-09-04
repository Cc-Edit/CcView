import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Constant } from '@/config/constant';
import { getStorage, setStorage } from '@/utils/common';

type UserInfo = {
  avatar?: string,
  email?: string,
  name?: string,
  role?: number,
  uuid?: number,
  status?: number
}
interface GlobalState {
  theme: string
  userInfo: UserInfo
  designId: string
  showAttr: boolean
}

const initialState: GlobalState = {
  theme: getStorage(Constant.ThemeKey, 'dark'),
  showAttr: true,
  userInfo: {},
  designId: ''
};
export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<string>) => {
      // Redux Toolkit 允许我们在 reducers 直接修改state，这在react中是不被建议的做法
      // 以往我们需要返回一个新的state，toolkit 使用了 Immer 库，所以我们可以直接修改state
      state.theme = action.payload;
      setStorage(Constant.ThemeKey, action.payload);
    },
    // 切换右侧属性面板显示
    switchAttr(state, action: PayloadAction<boolean>) {
      state.showAttr = action.payload;
    },
    // 保存设计ID
    setDesignId(state, action: PayloadAction<string>) {
      state.designId = action.payload;
    },
    // 保存用户信息
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
    // 清空数据
    destroy(state) {
      Object.assign(state, initialState);
    }
  }
});
// 为每个 case reducer 函数生成 Action creators
export const { setDesignId, switchTheme, switchAttr, setUserInfo, destroy } = globalSlice.actions;

export default globalSlice.reducer;