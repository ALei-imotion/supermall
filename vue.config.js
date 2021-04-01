module.exports = {
  configureWebpack: {
    resolve: {
      // extensions: ['.js', '.vue', '.css'],  // 对于脚手架3来说，不用在配置这个选项，默认创建时就已经配置好了(.js,.vue,.css)
      alias: {
        // '@': resolve('src'),   // 默认已经配置好了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}