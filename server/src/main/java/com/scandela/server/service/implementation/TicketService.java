package com.scandela.server.service.implementation;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scandela.server.dao.TicketDao;
import com.scandela.server.entity.AuditEntry;
import com.scandela.server.entity.Ticket;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IAuditService;
import com.scandela.server.service.ITicketService;

@Service
public class TicketService extends AbstractService<Ticket> implements ITicketService {
	@Autowired
	private IAuditService auditService;

    protected TicketService(TicketDao ticketDao) {
		super(ticketDao);
	}


	@Override
	public Ticket create(Ticket newTicket) {
		/* Entrée d'audit - Creation de ticket */
		AuditEntry auditEntry = new AuditEntry();

		auditEntry.setData(new ArrayList<>());

		auditEntry.setUserid(UUID.fromString(newTicket.getAuthor()));
		auditEntry.setAction("TICKET_CREATED");
		auditEntry.setTimestamp(new Timestamp(System.currentTimeMillis()));

		auditService.sendPostToCreate(auditEntry);

		return dao.save(newTicket);
	}
}
