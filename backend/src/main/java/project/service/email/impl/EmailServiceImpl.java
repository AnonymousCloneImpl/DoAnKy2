package project.service.email.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import project.service.email.EmailService;

@Service
@Slf4j(topic = "MAIL-SERVICE")
public class EmailServiceImpl implements EmailService {
	private final JavaMailSender mailSender;

	@Autowired
	public EmailServiceImpl(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	@Override
	public void sendEmail(String to, String subject, String body) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setSubject(subject);
			message.setText(body);
			mailSender.send(message);
		} catch (MailException e) {
			log.warn("Error while send email to customer");
		}
	}
}
