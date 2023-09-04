import { MenuType } from '@/types';

// 用户状态
export const UserStatus = ['已删除', '已禁用', '正常'];

// 用户角色
export const UserRole = ['管理员', '用户'];

// 页面状态
export const PageStatus = ['已删除', '已锁定', '正常可编辑'];

// 发布状态
export const PublishStatus = ['已发布', '有更新', '已下线', '未发布'];

// 文件类型
export const FileType = ['页面', '文件夹'];

// 头像菜单内容
export const HeadMenuData = [
  {
    key: 'edit',
    icon: 'Edit',
    title: '编辑资料',
    disable: true
  },
  {
    key: 'editAccount',
    icon: 'Settings',
    title: '账户管理',
    disable: true
  }
];

// 菜单数据
export const MenuData: MenuType[] = [
  {
    key: 'home',
    icon: 'Home',
    title: '首页',
    contentTitle: '欢迎使用CcView',
    href: '/',
    childKey: [],
    child: []
  },
  {
    key: 'sale',
    icon: 'LocalGroceryStore',
    href: '/sale',
    title: '产品销售'
  },
  {
    key: 'store',
    icon: 'Storefront',
    title: '模板商城',
    href: '/store',
    childKey: [],
    child: []
  },
  {
    key: 'application',
    icon: 'Source',
    title: '应用中心',
    href: '/application',
    childKey: [],
    child: []
  },
  {
    key: 'user',
    icon: 'Person',
    title: '用户管理',
    href: '/user'
  },
  // {
  //   key: 'editAccount',
  //   icon: 'Settings',
  //   title: '系统管理'
  // },
  {
    key: 'example',
    icon: 'Ballot',
    title: '示例页面',
    childKey: ['imageDemo', 'cookieDemo', 'reduxDemo', 'aboutDemo', 'designDemo', 'apiDemo'],
    child: [
      {
        key: '404',
        title: '404页面',
        href: '/404'
      },
      {
        key: '500',
        title: '500页面',
        href: '/500'
      },
      {
        key: 'maintenance',
        title: '维护页面',
        href: '/500?mt=1'
      },
      {
        key: 'formCreate',
        title: 'json生成表单',
        href: '/formCreate'
      }
    ]
  }
];
// 根据当前url找到激活菜单
export function findMenuByHref(href: string): MenuType {
  let menu = {};
  MenuData.forEach(item => {
    if (item.href === href) {
      menu = item;
    }
    if (Number(item?.child?.length) > 0) {
      let activeSub = item.child?.find(subMenu => subMenu.href === href);
      activeSub && (menu = activeSub);
    }
  });
  return menu as MenuType;
}

// 首页轮播图数据
export const HomeSwiperData = [
  {
    title: '操作简单易上手',
    lottiePath: '/lottie/bubble-gum-web-design.json',
    content: ['通过拖拽快速完成页面布局', '简洁高效的属性调节，轻松实现自定义', '支持网页开发、小程序开发、移动App开发', '没有软件开发经验也可以创建自己的应用程序']
  },
  {
    title: '快速发布部署',
    lottiePath: '/lottie/techny-launching-a-startup.json',
    content: ['一键发布部署多个平台', '无需等待即刻使用', '让创意更快速的转化为产品', '提高产品迭代速率，更快速的达成目标']
  },
  {
    title: '专注您的产品创意',
    lottiePath: '/lottie/techny-project-management.json',
    content: ['我们认为好的产品创意更珍贵', '我们愿意帮助您共同实现您的产品创意', '80%的时间花在项目构思，20%的时间留给项目开发', '基础功能免费注册使用，优先保障项目低成本启动']
  },
  {
    title: '后台数据报表',
    lottiePath: '/lottie/techny-data-dashboard.json',
    content: ['提供基础数据分析功能', '更直观的图表数据，快速分享您的成果', '提供专属的后台管理系统']
  }
];