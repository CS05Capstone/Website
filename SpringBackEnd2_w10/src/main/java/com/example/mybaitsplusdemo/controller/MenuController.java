package com.example.mybaitsplusdemo.controller;

import com.baomidou.mybatisplus.extension.api.R;
import com.example.mybaitsplusdemo.Service.MenuService;
import com.example.mybaitsplusdemo.mapper.MenuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class MenuController {

    @Autowired
    private MenuService menuService = new MenuService();
    @Autowired
    private MenuMapper mapper;

    @GetMapping("/api/menu")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(mapper.findAll());
    }

    @GetMapping("/api/menu/{username}")
    public ResponseEntity<?> findBy(@PathVariable String username) {
        return ResponseEntity.ok(menuService.findByUser(username));
    }
}

