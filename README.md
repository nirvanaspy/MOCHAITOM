## 打包步骤：
1、将css, font, img, js, layer, ztree移入static包中。

2、修改index.html中的路径（在路径上加'static/'）。

3、针对build文件夹中webpack.base.conf文件进行操作，添加css文件的出口，如下：
    {
            test: /\.css$/,
            include: [resolve('src'), resolve('test')],
            loader: 'babel-loader'
    }
    
4、针对config文件夹中的index.js文件进行操作，如下：
    原来为 assetsPublicPath: '/',
    改为   assetsPublicPath: './',
    即加一个点，（有两处）。
    
5、登录页面、选择工程页面、部署设计绑定页面，HelloWorld页面，图片路径的修改。



# ioammtool

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
