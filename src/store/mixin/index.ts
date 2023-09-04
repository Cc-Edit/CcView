import { PayloadAction } from '@reduxjs/toolkit';
import { set } from 'lodash';
export const dynamicSetter = (state: any, action: PayloadAction<{key: string, value: any}>) => {
  const { key, value } = action.payload;
  set(state, key, value);
};

export const dynamicSetterReducer = {
  dynamicSetter
};