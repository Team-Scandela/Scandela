package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.AuditEntry;
import com.scandela.server.service.IAuditService;

@RestController
@RequestMapping("/audit")
@CrossOrigin(origins = "*")
public class AuditController extends AbstractController<AuditEntry> {

    @Autowired
    public AuditController(IAuditService auditService) {
        super(auditService);
    }

    @GetMapping
    public List<AuditEntry> getAuditEntries() {
        return super.getAll();
    }

    @GetMapping("/{id}")
    public AuditEntry getAuditEntry(@PathVariable UUID id) {
        return super.get(id);
    }

    @PostMapping("/create")
	public AuditEntry createAuditEntry(@RequestBody AuditEntry newAuditEntry) throws Exception {
		return super.create(newAuditEntry);
	}

    @PutMapping("/{id}")
    public AuditEntry updateAuditEntry(@PathVariable UUID id, @RequestBody AuditEntry update) throws Exception {
        return super.update(id, update);
    }

    @DeleteMapping("/delete/{id}")
	public void deleteAuditEntry(@PathVariable UUID id) {
		super.delete(id);
	}
}