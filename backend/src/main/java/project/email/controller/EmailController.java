package project.email.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import project.email.service.EmailServiceImpl;

@RestController
public class EmailController {

    private final EmailServiceImpl emailServiceImpl;

    @Autowired
    public EmailController(EmailServiceImpl emailServiceImpl) {
        this.emailServiceImpl = emailServiceImpl;
    }

    @PostMapping("/send_email")
    public String sendEmail() {
        return emailServiceImpl.sendEmail("huunghia98er@gmail.com", "subject", " Hello World! ");
    }
}
