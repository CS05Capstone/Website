//package com.example.mybaitsplusdemo.Config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
////This class used to setup the CORS policy, 来控制哪些域名可以访问这个端口
//@Configuration
//public class CorsConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry){
//        registry.addMapping("/**") //迅速跨域访问的路径
//                .allowedOrigins("*") //允许跨域访问的源
//                .allowedMethods("POST","GET","PUT","OPTIONS","DELETE") //允许请求方法
//                .maxAge(168000) //预检间隔时间
//                .allowedHeaders("*")//允许头部设置
//                .allowCredentials(true); //是否发送cookie
//    }
//}
