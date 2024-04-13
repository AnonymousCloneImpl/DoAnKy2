package project.service.email;

import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    public String sendEmail(String to, String subject, String body);
}
