import PriceItem from './PriceItem';
export default function Sale() {
  const freeData = {
    title: '主题版本',
    desc: '包含框架模板以及主题样式，可用于快速初始化项目',
    isFree: true,
    moduleList: [
      'React18 + Next.js 基础框架',
      '404、500 动态页面模板',
      'Json 创建表单模块',
      '基础示例页面： 10+',
      '基础组件： 20+'
    ],
    price: {
      old: '399',
      now: '0'
    }
  };
  const proData = {
    title: '全量版本',
    desc: '包含当前最新版本的完整项目代码，用于低代码类产品的快速起步',
    isRecommend: true,
    moduleList: [
      '主题版本所有内容',
      '大屏编辑器模块',
      '大屏预览、模板预览模块',
      '大屏相关组件：40+',
      '大屏专用组件库基础版本V1.0',
      'Echarts基础配置、高级配置文件',
      '项目后端系统：Nestjs + Mongodb',
      '后端包括：JWT登录、OSS资源管理、用户管理、模板管理、设计管理、定时任务...'
    ],
    price: {
      old: '29999',
      now: '3288'
    }
  };
  const vipData = {
    title: '开发者版本',
    desc: '永久提供项目最新版本，优先响应问题，产品建议优先排期',
    isVIp: true,
    moduleList: [
      '全量版本所有内容',
      '分配 GitHub 项目权限',
      '加入开发者协作群，共享技术文档',
      '产品建议优先排期，问题优先处理',
      '后续功能免费升级'
    ],
    price: {
      old: '59999',
      now: '4988'
    }
  };
  const upData = {
    title: '增量升级包',
    desc: '不定时发布增量组件库升级包、模板升级包',
    isUp: true,
    moduleList: [
      '组件库升级包',
      '模板升级包',
      '小程序编辑器扩展包',
      'APP编辑器扩展包',
      '表单编辑器扩展包'
    ],
    price: {
      old: '99999',
      now: -1
    }
  };
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='mt-2 w-full flex flex-row justify-center items-center'>
          <div className='container max-w-full mx-auto py-12 px-6'>
            <div className='max-w-full'>
              <div className='relative flex flex-nowrap  flex-col md:flex-row items-center'>
                <PriceItem className='w-100  2xl:w-120  shrink-0 mr-8' data={freeData} />
                <PriceItem className='w-100  2xl:w-120 shrink-0 scale-110 z-10' data={proData}/>
                <PriceItem className='w-100  2xl:w-120 shrink-0 ml-8' data={vipData}/>
                <PriceItem className='w-100  2xl:w-120 shrink-0 ml-4' data={upData}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
