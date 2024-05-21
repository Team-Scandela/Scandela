package com.scandela.server.service;

import com.scandela.server.entity.AuditEntry;

public interface IAuditService extends IService<AuditEntry> {

    void sendPostToCreate(AuditEntry auditEntry);
    // public void sendPostToCreate(AuditEntry newAuditEntry);
}
