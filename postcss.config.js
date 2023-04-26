// postcss.config.js

// 自动将px转成rem
// 配置文件的意义，这个配置文件需要导出一个对象
// 
module.exports = {
  // 配置要使用的相关插件
    plugins: {
      // postcss-pxtorem 插件的版本需要 >= 5.0.0
      
      // autoprefixer:{
      // browser配置要兼容到的浏览器环境
      // 兼容性配置写在 .browserslistrc
      //     browsers:['Android>=4.0','IOS>=8']
      // },

      'postcss-pxtorem': {
        // 正常情况下按照设计稿来设定这个转换的根元素基准值，
        // 如果设计稿是750,就写75
        // vant组件库的逻辑像素宽是375，所以要写成37.5
        rootValue({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75;
        },
        // 需要转换的css属性，*指的是所有的，
        propList: ['*'],
      },
    },
  };