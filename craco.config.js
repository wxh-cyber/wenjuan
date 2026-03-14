module.exports={
    devServer:{
        port:8000,      //B端，前端
        //配置代理
        proxy:{
            '/api':{
                target:'http://localhost:3001',
                changeOrigin:true,
            }
        }
    }
}