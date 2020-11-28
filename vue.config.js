module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin:true,
                pathRewrite: {
                    '/api':''
                }
            }
        }
    },
    productionSourceMap:true,
    chainWebpack:(config)=>{
        // 这里是要删除没用的prefetch，等到调用时再次使用
        config.plugins.delete('prefetch');
    } 
}