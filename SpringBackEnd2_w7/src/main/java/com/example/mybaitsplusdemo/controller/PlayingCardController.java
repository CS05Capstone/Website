package com.example.mybaitsplusdemo.controller;

import com.example.mybaitsplusdemo.entity.PlayingCard;
import com.example.mybaitsplusdemo.Service.PlayingCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/playing-card")
@CrossOrigin
public class PlayingCardController {

    @Autowired
    private PlayingCardService playingCardService;

    @PostMapping("/create")
    public ResponseEntity<String> createPlayingCard(@RequestParam("userId") Long userId,
                                                    @RequestParam("attributes1") int attributes1,
                                                    @RequestParam("attributes2") int attributes2,
                                                    @RequestParam("avatar") MultipartFile avatar) {
        try {
            PlayingCard card = new PlayingCard();
            card.setUserId(userId);
            card.setAttributes1(attributes1);
            card.setAttributes2(attributes2);

            playingCardService.addPlayingCard(card, avatar);

            return ResponseEntity.ok("Playing card created successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating playing card.");
        }
    }
}
