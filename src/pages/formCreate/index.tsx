import FormFactory from '@/components/Form/FormFactory';
import TemplateForm from '@/config/form/TemplateForm';
import CreateApp from '@/config/form/CreateApp';
import CreatePage from '@/config/form/CreatePage';
import LoginForm from '@/config/form/LoginForm';
import { EventParams } from '@/types';
export default function FormCreate() {
  function onSubmit() {
  }
  // 表单内的事件统一处理
  function onEvent(eventParams: EventParams) {
    const { type, data, form: { control, resetField }, refs } = eventParams;
    // 提交事件
    if (type === 'submit') {
      onSubmit();
    }
    // 图片验证码刷新事件， 同时清空验证码输入框
    if (type === 'refreshCaptcha') {
      resetField('captcha');
    }
  }
  return (
    <>
      <div className='dark:bg-zinc-800 bg-zinc-200 rounded-xl pl-10 pr-10 pt-2 mb-10'>
        <h2 id='examples' className='border-left-md mb-8'>应用创建</h2>
        <div className='w-full'>
          <FormFactory
            config={CreateApp}
            onEvent={onEvent} />
        </div>
      </div>
      <div className='dark:bg-zinc-800 bg-zinc-200 rounded-xl pl-10 pr-10 pt-2 mb-10'>
        <h2 id='examples' className='border-left-md mb-8'>页面创建</h2>
        <div className='w-full'>
          <FormFactory
            config={CreatePage}
            onEvent={onEvent} />
        </div>
      </div>
      <div className='dark:bg-zinc-800 bg-zinc-200 rounded-xl pl-10 pr-10 pt-2 mb-10'>
        <h2 id='examples' className='border-left-md mb-8'>登录表单</h2>
        <div className='w-full'>
          <FormFactory
            config={LoginForm}
            onEvent={onEvent} />
        </div>
      </div>
      <div className='dark:bg-zinc-800 bg-zinc-200 rounded-xl pl-10 pr-10 pt-2 mb-10'>
        <h2 id='examples' className='border-left-md mb-8'>json 生成</h2>
        <div className='w-full'>
          <FormFactory
            config={TemplateForm}
            onEvent={onEvent} />
        </div>
      </div>
    </>
  );
}

