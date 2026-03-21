module.exports={
    webpack:{
        configure(webpackConfig){
            if(webpackConfig.mode==='production'){
                //抽离公共代码，只在生产环境
                if(webpackConfig.optimization==null){
                    webpackConfig.optimization={}
                }
                
                webpackConfig.optimization.splitChunks={
                    chunks:'all',
                    cacheGroups:{
                        antd:{
                            name:'antd-chunk',
                            test:/antd/,
                            priority:100
                        },
                        reactDom:{
                            name:'reactDom-chunk',
                            test:/react-dom/,
                            priority:99
                        },
                        vendors:{
                            name:'vendors-chunk',
                            test:/[\\/]node_modules[\\/]/,
                            priority:98
                        }
                    }
                }
            }

            //最后在该函数内返回配置好的webpack配置
            return webpackConfig;
        }
    },

    devServer:{
        port:8000,      //B端，前端
        //配置代理
        proxy:{
            '/api':{
                target:'http://localhost:3001',
                changeOrigin:true,
            }
        }
    },

    //增加jest配置，保证antd组件的样式可以被正确加载
    jest:{
        configure:{
            moduleNameMapper:{
                '^@rc-component/picker/locale/(.*)$':'<rootDir>/node_modules/@rc-component/picker/lib/locale/$1.js',
                '^@rc-component/picker/generate/(.*)$':'<rootDir>/node_modules/@rc-component/picker/lib/generate/$1.js'
            }
        }
    }
}
