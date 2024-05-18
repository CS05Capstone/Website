package com.example.mybaitsplusdemo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.Scanner;

@SpringBootApplication
@MapperScan("com.example.mybaitsplusdemo.mapper")
public class MybaitsplusDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MybaitsplusDemoApplication.class, args);
    }
}
