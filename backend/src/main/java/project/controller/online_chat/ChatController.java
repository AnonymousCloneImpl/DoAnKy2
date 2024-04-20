package project.controller.online_chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {
	@MessageMapping("/chat")
	@SendTo("/topic/messages")
	public String getMessage(@Payload String message) {
		System.err.println(message);
		return message;
	}
}
