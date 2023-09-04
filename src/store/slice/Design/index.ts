import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getDesign } from '@api/design';
import { dynamicSetterReducer } from '@/store/mixin';
import { getDetail } from '@api/application';
import { getTemplate } from '@api/template';
import { getUid } from '@/components/Design/utils/common';

export interface Component {
  id: string
  name: string
  child: Component[]
}
interface Lines {
  v: number[]
  h: number[]
}
interface DesignState {
  loaded: boolean
  layout: Component[]
  designId: string
  lines: Lines
  copyId: string,
  selectIds: string[]
  attribute:Record<string, any>,
  page: Record<string, any>,
  event: Record<string, any>,
  api: Record<string, any>,
}
interface AttributeElement {
  [key: string]: any
}
const initialState: DesignState = {
  loaded: false,
  layout: [],
  lines: { v: [], h: [] },
  selectIds: [],
  designId: '',
  copyId: '',
  attribute: {},
  page: {},
  event: {},
  api: {}
};

function deleteComponent(components:Component[], deleteIds: string[]) {
  return components.filter(component => {
    if (component.child.length > 0) {
      component.child = deleteComponent(component.child, deleteIds);
    }
    return !deleteIds.includes(component.id);
  });
}
export const fetchDesignData = createAsyncThunk(
  'design/fetchDesignData',
  async(id: string, thunkAPI) => {
    if (!id) return null;
    const pageData = await getDetail(id);
    const designData = await getDesign(id);
    return {
      designData: designData.data || {},
      pageData: pageData.data || {},
      designId: id
    };
  }
);
export const fetchTemplateData = createAsyncThunk(
  'design/fetchTemplateData',
  async(id: string, thunkAPI) => {
    if (!id) return null;
    const templateData = await getTemplate(id);
    return {
      templateData: templateData.data || {},
      designId: id
    };
  }
);
export const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    ...dynamicSetterReducer,
    /**
     * 更新辅助线
     * */
    updateLines(state, action: PayloadAction<Lines>) {
      state.lines = action.payload;
    },
    /**
     * 选中元素
     * */
    selectComponents(state, action: PayloadAction<string[]>) {
      state.selectIds = action.payload;
    },
    /**
     * 复制元素
     * */
    copyComponents(state, action: PayloadAction<string>) {
      state.copyId = action.payload;
    },
    /**
     * 粘贴元素
     * */
    pasteComponent(state, action: PayloadAction<string | null>) {
      const targetId = action.payload || state.copyId;
      if (targetId) {
        const component = state.layout.find(element => element.id === targetId);
        const attribute = state.attribute[targetId];
        const { position } = attribute;
        const newId = getUid();
        const newComponent = {
          ...component,
          id: newId,
          child: []
        };
        const newAttr = {
          ...attribute,
          id: newId,
          position: {
            ...position,
            left: position.left + 10,
            top: position.top + 10,
            z: position.z + 1
          }
        };
        state.layout.push(newComponent as Component);
        state.attribute[newId] = newAttr;
        state.api[newId] = state.api[targetId] || {};
        state.event[newId] = state.event[targetId] || [];
        state.selectIds = [newId];
      }
    },
    /**
     * 添加元素
     * */
    addComponent(state, action: PayloadAction<{component: Component, attribute: AttributeElement, api: Record<string, any>, event: Record<string, any>[] }>) {
      const { component, attribute = {}, api = {}, event = [] } = action.payload;
      const { id } = attribute;
      state.layout.push(component);
      state.attribute[id] = attribute;
      state.api[id] = api;
      state.event[id] = event;
      state.selectIds = [id];
    },
    /**
     * 删除元素
     * */
    deleteComponents(state, action: PayloadAction<string[]>) {
      const deleteIds = action.payload;
      state.layout = deleteComponent(state.layout, deleteIds);
      deleteIds.forEach(id => {
        if (state.attribute[id]) delete state.attribute[id];
        if (state.api[id]) delete state.api[id];
        if (state.event[id]) delete state.event[id];
      });
    },
    /**
     * 移动元素
     * */
    moveElement() {},
    // 更新元素属性
    updateEleAttr(state, action: PayloadAction<AttributeElement>) {
      const attribute = action.payload;
      const { id } = attribute;
      const oldAttr = state.attribute[id];
      state.attribute[id] = Object.assign(oldAttr, attribute);
    },
    destroy(state) {
      Object.assign(state, initialState);
    }
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchDesignData.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload && !state.loaded) {
        const { designData: { layout, attribute, page, lines, event, api }, pageData: { title, cover }, designId } = action.payload;
        state.designId = designId;
        state.layout = layout ? JSON.parse(layout) : initialState.layout;
        state.page = page ? JSON.parse(page) : initialState.page;
        state.lines = lines ? JSON.parse(lines) : initialState.lines;
        state.page.title = title;
        state.page.cover = cover;
        state.event = event ? JSON.parse(event) : initialState.event;
        state.api = api ? JSON.parse(api) : initialState.api;
        state.attribute = attribute ? JSON.parse(attribute) : initialState.attribute;

        state.loaded = true;
      }
    });
    builder.addCase(fetchTemplateData.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload && !state.loaded) {
        const { templateData: { templateStr }} = action.payload;
        try {
          const dataConfig = JSON.parse(templateStr);
          const { api, attribute, event, layout, lines, page } = dataConfig;
          state.layout = layout ? JSON.parse(layout) : initialState.layout;
          state.page = page ? JSON.parse(page) : initialState.page;
          state.lines = lines ? JSON.parse(lines) : initialState.lines;
          state.event = event ? JSON.parse(event) : initialState.event;
          state.api = api ? JSON.parse(api) : initialState.api;
          state.attribute = attribute ? JSON.parse(attribute) : initialState.attribute;
          state.loaded = true;
        } catch (e) { /* empty */ }
      }
    });
  }
});

// 为每个 case reducer 函数生成 Action creators
export const { pasteComponent, copyComponents, updateEleAttr, deleteComponents, addComponent, selectComponents, updateLines, destroy } = designSlice.actions;

export default designSlice.reducer;