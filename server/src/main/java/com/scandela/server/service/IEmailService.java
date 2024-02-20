package com.scandela.server.service;

import org.springframework.mail.javamail.JavaMailSender;

public interface IEmailService {
    public void sendMail(String receiver, String subject, String message);

    public JavaMailSender getJavaMailSender();

    public void sendMessageWithAttachment(String to, String subject, String text, String pathToAttachment);
}
