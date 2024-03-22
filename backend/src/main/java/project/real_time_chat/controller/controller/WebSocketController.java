package project.real_time_chat.controller.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import project.real_time_chat.controller.Message;
import project.real_time_chat.controller.OutputMessage;

import java.util.Date;

@Controller
public class WebSocketController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public OutputMessage send(Message message) throws Exception {
        // Xử lý tin nhắn và tạo OutputMessage
        return new OutputMessage(message.getFrom(), message.getText(), new Date());
    }
}