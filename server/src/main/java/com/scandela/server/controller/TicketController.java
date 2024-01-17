package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.Ticket;
import com.scandela.server.service.ITicketService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/, https://app.scandela.fr/")
@RequestMapping(value = "/tickets")
public class TicketController extends AbstractController<Ticket> {
	
	// Constructors \\
	protected TicketController(ITicketService ticketService) {
		super(ticketService);
	}

    @GetMapping
	public List<Ticket> getTickets() {
		return service.getAll();
	}

    @GetMapping("/{id}")
	public Ticket getUser(@PathVariable UUID id) {
		return service.get(id);
	}

    @PostMapping("/create")
    public Ticket createTicket(@RequestBody Ticket newTicket) throws Exception {
        return service.create(newTicket);
    }

    @DeleteMapping("/delete/{id}")
	public void deleteTicket(@PathVariable UUID id) {
		service.delete(id);
	}
}
