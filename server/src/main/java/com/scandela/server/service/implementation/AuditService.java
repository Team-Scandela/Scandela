package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.AuditEntryDao;
import com.scandela.server.entity.AuditEntry;
import com.scandela.server.entity.User;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IAuditService;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuditService extends AbstractService<AuditEntry> implements IAuditService {

    private static final Logger logger = LoggerFactory.getLogger(AuditService.class);

    protected AuditService(AuditEntryDao auditEntryDao) {
        super(auditEntryDao);
    }

    @Override
    public AuditEntry create(AuditEntry newAuditEntry) {
        logger.info("Audit entry saved: {}", newAuditEntry);
        return dao.save(newAuditEntry);
    }

}