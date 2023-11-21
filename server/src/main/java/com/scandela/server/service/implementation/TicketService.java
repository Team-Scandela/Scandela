package com.scandela.server.service.implementation;

import com.scandela.server.dao.TicketDao;
import com.scandela.server.entity.Ticket;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ITicketService;

public class TicketService extends AbstractService<Ticket> implements ITicketService {
    protected TicketService(TicketDao ticketDao) {
		super(ticketDao);
	}
}
