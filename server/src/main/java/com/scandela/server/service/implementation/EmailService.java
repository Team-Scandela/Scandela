package com.scandela.server.service.implementation;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IEmailService;

@Component
public class EmailService extends AbstractService implements IEmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleEmail(String receiver, String subject, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("noreply@baeldung.com");
        mail.setTo(receiver);
        mail.setSubject(subject);
        mail.setText(message);

        emailSender.send(mail);
    }

    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("my.gmail@gmail.com");
        mailSender.setPassword("password");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
