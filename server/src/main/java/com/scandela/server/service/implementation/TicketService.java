package com.scandela.server.service.implementation;

import java.sql.Timestamp;
import java.util.ArrayList;

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
		// AuditEntry auditEntry = new AuditEntry();

		// auditEntry.setData(new ArrayList<>());

		// auditEntry.setUserId(newTicket. .get().getId());
		// auditEntry.setAction("USER_SIGNIN");
		// auditEntry.setTimestamp(new Timestamp(System.currentTimeMillis()));

		// if (user.get().getUsername() != null) {
		// auditEntry.getData().add(user.get().getUsername());
		// } else {
		// auditEntry.getData().add(user.get().getEmail());
		// }

		// auditService.create(auditEntry);
		return dao.save(newTicket);
	}
}
