module.exports = {
    devServer: {
        port: 8000,
        //下面配置一个开发时的请求表
        proxy:{
            '/mapi':{
                target:'http://localhost:8000',
                changeOrigin: true,
                ws:true,
                pathRewrite:{
                    "^/mapi":'/mock'
                }
            }
        }
    },
}