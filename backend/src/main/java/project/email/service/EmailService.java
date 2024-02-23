package project.email.service;

import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    public String sendEmail(String to, String subject, String body);
}
