import {
  FormControl
} from '@mui/material';
import { useForm, Control } from 'react-hook-form';
import FormItem from '@/components/Form/FormItem';
import { EventParams, FormConfig, FormConfigItem } from '@/types';
import { useRef } from 'react';
interface FormCreateProp {
  itemClass?: string
  rowClass?: string
  isUpdate?:boolean
  defaultVal?:Record<string, any>
  config: FormConfig
  onEvent: (para : EventParams) => void
}
const NotField = ['Capture', 'SubmitButton', 'CancelButton'];
// 根据配置文件取出 rules 和 default
function initFormConfig(config: FormConfig, defaultVal?: Record<string, any>) {
  if (defaultVal) return [defaultVal];
  const defaultValues = {};
  const rowData = config.rowData;
  rowData.forEach(row => {
    row.forEach(formItem => {
      const { name, defaultValue, component = '' } = formItem;
      if (!NotField.includes(component)) {
        Object.assign(defaultValues, {
          [name]: defaultValue
        });
      }
    });
  });
  return [defaultValues];
}

// 生成每一行的表单
function genFormRow(rowList : FormConfigItem[], control: Control, eventHandler: (type: string, data : Record<string, any>) => void, props: FormCreateProp, key: string, refsMap: Record<string, any>) {
  const { config: { rowClass = 'mb-6' }, isUpdate = false } = props;

  const rowElement = rowList.map((formItem, index) => {
    const container = useRef(null);
    Object.assign(refsMap, {
      [formItem.name]: container
    });
    return (
      <div key={`${formItem.name}-${index}`} className={`${formItem.className}`}>
        <FormItem ref={container} isUpdate={isUpdate} config={formItem} control={control} eventHandler={eventHandler} />
      </div>
    );
  });
  return (
    <div key={key} className={`${rowClass} flex flex-row flex-wrap justify-start`}>
      {
        rowElement
      }
    </div>
  );
}

export default function FormFactory<T>(props: FormCreateProp) {
  const { config, defaultVal, isUpdate = false } = props;
  const [defaultValues] = initFormConfig(config, defaultVal);
  const refsMap = {};
  // 初始化 react-hook-form
  const { control, resetField, handleSubmit } = useForm({ defaultValues });

  // 表单事件代理
  const eventHandler = (type: string, data : Record<string, any>) => {
    const { onEvent } = props;
    onEvent && onEvent({
      isUpdate,
      type,
      data,
      form: {
        control,
        resetField
      },
      refs: refsMap
    });
  };
  const fromChild = config.rowData.map((rowConfig, index) => {
    return genFormRow(rowConfig, control, eventHandler, props, `from-row-${index}`, refsMap);
  });
  return <FormControl
    component='form'
    onSubmit={handleSubmit(data => {
      eventHandler('submit', data);
    })}
    className='w-full'
  >
    {
      fromChild
    }
  </FormControl>;
}