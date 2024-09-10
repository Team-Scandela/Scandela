package com.scandela.server.util;

import java.nio.file.AccessDeniedException;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.scandela.server.entity.User;

@Aspect
@Component
public class AdminVilleAccessAspect {

    @Around("@annotation(AdminVilleAccess)")
    public Object checkAdminVilleAccess(ProceedingJoinPoint joinPoint) throws Throwable {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (currentUser.isAdminville()) {
            return joinPoint.proceed();
        } else {
            throw new AccessDeniedException("Accès refusé. Vous devez être Admin_Ville.");
        }
    }
}