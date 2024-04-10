package com.example.mybaitsplusdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

//@Controller
//public class WebSocketNotificationController {
//
//    @Autowired
//    private SimpMessagingTemplate messagingTemplate;
//
//    public void notifySessionUpdate(Long sessionId) {
//        messagingTemplate.convertAndSend("/topic/sessionUpdates", sessionId);
//    }
//}
@Controller
public class WebSocketNotificationController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WebSocketNotificationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifySessionUpdate(Long sessionId) {
        messagingTemplate.convertAndSend("/topic/sessionUpdates", sessionId);
    }
}
