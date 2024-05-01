package com.example.mybaitsplusdemo.controller;
import com.example.mybaitsplusdemo.Service.AvatarService;
import com.example.mybaitsplusdemo.entity.Avatar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/avatars")
public class AvatarController {

    @Autowired
    private AvatarService avatarService;

    @GetMapping("/{id}")
    public ResponseEntity<Avatar> getAvatarById(@PathVariable int id) {
        Avatar avatar = avatarService.getAvatarById(id);
        if (avatar != null) {
            return ResponseEntity.ok(avatar);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createAvatar(@RequestBody Avatar avatar) {
        try {
            avatarService.saveAvatar(avatar);
            return ResponseEntity.ok("Avatar created successfully. Avatar ID: " + avatar.getId());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating Avatar");
        }
    }

}