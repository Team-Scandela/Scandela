package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.AuditEntryDao;
import com.scandela.server.entity.AuditEntry;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IAuditService;

@Service
public class AuditService extends AbstractService<AuditEntry> implements IAuditService {

    protected AuditService(AuditEntryDao auditEntryDao) {
        super(auditEntryDao);
    }

}