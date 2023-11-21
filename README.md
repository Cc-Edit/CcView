## [【求职中】北京公司请联系我 😊(点击查看微信👉🏻)](https://github.com/Cc-Edit/Cc-Edit/blob/main/public/wechat.png)

|                                      学习讨论小组🍻                                      |   打赏（赠送学习资料：[webNote](https://github.com/Cc-Edit/webNote)） :confetti_ball:    | 
|:----------------------------------------------------------------------------------:|:---------------------------------------------------------------------:| 
| ![CcView.png](https://github.com/Cc-Edit/Cc-Edit/blob/main/public/CcView.png) |     ![img.png](https://github.com/Cc-Edit/Cc-Edit/blob/main/public/img.png)  |



# CcView

## demo地址
> https://ccedit.com/

## 版权
仅限于个人学习使用，不可用于商业用途  
商用需联系作者购买授权  
软著登记号：2023SR1434342

## 核心库
> 组件库以及编辑器使用git subModule的方式集成  
### 低代码组件库
[白露 https://github.com/Cc-Edit/CcBailu](https://github.com/Cc-Edit/CcBailu)
### 后台服务
[CcServer https://github.com/Cc-Edit/CcServer](https://github.com/Cc-Edit/CcServer)


## 本地运行

> $ git clone --recurse-submodules https://github.com/Cc-Edit/CcView.git    

或
>
> $ git clone https://github.com/Cc-Edit/CcView.git        
> $ git submodule update --init   


更新所有子模块    
> $ git submodule update --remote

本地运行：
> $ yarn install   
> $ yarn dev


## 设计原则

### 数据驱动
整个应用的核心就是数据驱动，将所有可被抽象的逻辑全部抽象为 jsonSchema   
整个应用遵守配置化、描述化原则

### JSON to Form 表单描述
表单的创建与校验，全部集中到配置文件中 [form](src/config/form)  
登录表单： [LoginForm.ts](src%2Fconfig%2Fform%2FLoginForm.ts)   
![form-login.png](preview%2Fform-login.png)

应用创建弹窗： [CreateApp.ts](src%2Fconfig%2Fform%2FCreateApp.ts)
![form1.png](preview%2Fform1.png)

表单回显(用于数据更新)： 
![form-echo.png](preview%2Fform-echo.png)

表单模板(所有基础表单元素示例) [TemplateForm.ts](src%2Fconfig%2Fform%2FTemplateForm.ts)
![form.png](preview%2Fform.png)

## 预览

#### 登录页面

> 视频透明背景播放  
![](./preview/login.png)

#### 登录页面-表单校验

![](./preview/login_form.png)

#### 登录页面-全局提示

![](./preview/login_alert.png)

#### 首页

![](./preview/home1.png)
![](./preview/home2.png)
![](./preview/home1-w.png)
![](./preview/home2-w.png)

####  应用列表
![applist.png](preview%2Fapplist.png)
![applist1.png](preview%2Fapplist1.png)
![applist3.png](preview%2Fapplist3.png)
![applist2.png](preview%2Fapplist2.png)

### 编辑器
![design.png](preview%2Fdesign.png)
![design-w.png](preview%2Fdesign-w.png)
![design-b.png](preview%2Fdesign-b.png)
![design-p.png](preview%2Fdesign-p.png)
![design-data.png](preview%2Fdesign-data.png)

#### 404页面
![](./preview/404.png)

#### 500页面
![](./preview/500.png)

#### 维护页面
![](./preview/500-maintain.png)

### 工具类库
#### 插画与图标 [https://igoutu.cn/](https://igoutu.cn/)
#### Icons by icons8: [icons8.com](https://icons8.com)
#### 画板标尺 (基于 react18 翻新 mb-sketch-ruler )： [mb-sketch-ruler](https://github.com/mockingbot/mb-sketch-ruler)
#### 头像、默认模板背景图：千图网个人商用授权
