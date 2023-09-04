import { configureStore, ThunkAction, Action, createListenerMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { designSlice } from '@/store/slice/Design';
import { globalSlice } from '@/store/slice/Global';
import { counterSlice } from '@/store/slice/Counter';
import { debounce } from 'lodash';
import { saveDesign } from '@api/design';

const actionMap: Record<string, any> = {
  design: designSlice.actions,
  global: globalSlice.actions,
  counter: counterSlice.actions
};
const reducerMap = {
  design: designSlice.reducer,
  global: globalSlice.reducer,
  counter: counterSlice.reducer
};

// store 监控
const listenerActions = Object.keys(designSlice.actions).map(key => `design/${key}`);
const listenerMiddleware = createListenerMiddleware();
const saveDesignData = debounce(getState => {
  const state = getState();
  const designData = state.design;
  const { designId, lines, layout, attribute, page, event, api } = designData;
  designId && saveDesign({
    id: designId,
    lines: lines ? JSON.stringify(lines) : '',
    layout: layout ? JSON.stringify(layout) : '',
    api: api ? JSON.stringify(api) : '',
    event: event ? JSON.stringify(event) : '',
    page: page ? JSON.stringify(page) : '',
    attribute: attribute ? JSON.stringify(attribute) : ''
  });
}, 600);
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return listenerActions.includes(action.type);
  },
  effect: async(action, listenerApi) => {
    if (action.type.indexOf('destroy') > -1) {
      return;
    }
    saveDesignData(listenerApi.getState);
  }
});

// 利用 toolkit 创建一个 store
export function makeStore() {
  return configureStore({
    reducer: reducerMap,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
  });
}

const store = makeStore();

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
// 使 useSelector 使用更简单, 减少类型声明
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

// 跨切片自动 Dispatch 操作数据
export const autoDispatch = (storeInfo: {key: string, value: any}) => {
  const { key, value } = storeInfo;
  if (!key) { return; }
  const storeKey = key.split('.');
  const [sliceName, ...dataKey] = storeKey;
  store.dispatch(actionMap[sliceName]?.dynamicSetter({
    key: dataKey.join('.'),
    value
  }));
};

export default store;
