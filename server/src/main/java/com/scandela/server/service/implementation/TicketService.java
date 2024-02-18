package com.scandela.server.service.implementation;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.TicketDao;
import com.scandela.server.entity.Ticket;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ITicketService;

@Service
public class TicketService extends AbstractService<Ticket> implements ITicketService {

	private final String[] IGNORED_PROPERTIES = { "id", "author", "date"};

	protected TicketService(TicketDao ticketDao) {
		super(ticketDao);
	}


	@Override
	public Ticket update(UUID id, Ticket update, String... editables) throws Exception {
		try {
			Ticket ticket = super.update(id, update, IGNORED_PROPERTIES);

			return ticket;
		} catch (Exception e) {
			throw e;
		}
	}
}
