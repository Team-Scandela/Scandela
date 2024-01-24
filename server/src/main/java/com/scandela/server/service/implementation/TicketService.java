package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.TicketDao;
import com.scandela.server.entity.Ticket;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ITicketService;

@Service
public class TicketService extends AbstractService<Ticket> implements ITicketService {
    protected TicketService(TicketDao ticketDao) {
		super(ticketDao);
	}
}
