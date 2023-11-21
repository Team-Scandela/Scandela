package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Ticket;
import com.scandela.server.service.ITicketService;

@RestController
@RequestMapping(value = "/tickets")
public class TicketController extends AbstractController {

    @Autowired
	private ITicketService ticketService;

    @GetMapping
	public List<Ticket> getTickets() {
		return ticketService.getAll();
	}

    @GetMapping("/{id}")
	public Ticket getUser(@PathVariable UUID id) {
		return ticketService.get(id);
	}

    @PostMapping
    public void createTicket() {
        ;
    }

    @DeleteMapping("/delete/{id}")
	public void deleteTicket(@PathVariable UUID id) {
		ticketService.delete(id);
	}
}
