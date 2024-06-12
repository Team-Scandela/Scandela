package com.scandela.server.util;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Auditable;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Component;

import com.scandela.server.entity.AuditEntry;
import com.scandela.server.service.implementation.AuditService;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

@Aspect
@Component
public class AuditAspect {
    private final AuditService auditService;
    private static final Logger logger = LoggerFactory.getLogger(AuditService.class);

    public AuditAspect(AuditService auditService) {
        this.auditService = auditService;
    }

    // @AfterReturning("@annotation(auditable)")
    public void audit(JoinPoint joinPoint, Auditable auditable) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();

        //Set timestamp
        AuditEntry auditEntry = new AuditEntry();
        auditEntry.setTimestamp(Timestamp.from(Instant.now()));

        // Set action
        switch (method.getName()) {
            case "signIn":
            auditEntry.setAction("USER_SIGNIN");
                break;

            default:
                auditEntry.setAction(method.getName());
                break;
        }

        // Set userId
        // String userId = auditable.userId();
        String userId = "tmpUserId";
        if (userId != null && !userId.isEmpty()) {
            try {
                auditEntry.setUserid(UUID.fromString(userId));
            } catch (IllegalArgumentException e) {
                logger.error("Invalid UUID string: " + userId, e);
                auditEntry.setUserid(null);
            }
        } else {
            logger.warn("User ID is null or empty for the audit entry");
            auditEntry.setUserid(null);
        }

        try {
            auditService.create(auditEntry);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}