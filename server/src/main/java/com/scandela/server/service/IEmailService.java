package com.scandela.server.service;

import org.springframework.mail.javamail.JavaMailSender;

public interface IEmailService {
    public void sendSimpleEmail(String receiver, String subject, String message);
    public JavaMailSender getJavaMailSender();
}
