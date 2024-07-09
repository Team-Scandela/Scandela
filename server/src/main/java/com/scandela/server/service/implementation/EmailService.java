package com.scandela.server.service.implementation;

import java.io.File;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.scandela.server.service.IEmailService;

import jakarta.mail.internet.MimeMessage;

@Component
public class EmailService implements IEmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void sendMail(String receiver, String subject, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("noreply@scandela.com");
        mail.setTo(receiver);
        mail.setSubject(subject);
        mail.setText(message);

        // mail.setText("To confirm your account, please click here : "
        // + "https://dev.scandela.fr:2000/redirect?email=" + receiver);

        emailSender.send(mail);

    }

    @Override
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

    @Override
    public void sendMessageWithAttachment(String to, String subject, String text, String filepath) {

        MimeMessage message = emailSender.createMimeMessage();

        try {

            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@baeldung.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            FileSystemResource file = new FileSystemResource(new File(filepath));

            helper.addAttachment("Invoice", file);

            emailSender.send(message);
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
