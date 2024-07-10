package com.scandela.server.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.UserAction;
import com.scandela.server.service.IActionHistoryService;

@RestController
@RequestMapping(value = "/actionhistory")
@CrossOrigin(origins = "*")
public class ActionHistoryController extends AbstractController<UserAction> {

    protected ActionHistoryController(IActionHistoryService actionHistoryService) {
		super(actionHistoryService);
	}

    @GetMapping
    public List<UserAction> getUsersActions() {
        return super.getAll();
    }

    @GetMapping("/{id}")
    public UserAction getUsersActions(@PathVariable UUID id) {
        return super.get(id);
    }

    @PostMapping("/create")
	public UserAction createUserAction(@RequestBody UserAction newUserAction) throws Exception {
		return super.create(newUserAction);
	}

    @PostMapping("/createlist")
	public List<UserAction> createUserAction(@RequestBody List<UserAction> newUserAction) throws Exception {
		return ((IActionHistoryService) service).create(newUserAction);
	}

    @PutMapping("/{id}")
    public UserAction updateUserAction(@PathVariable UUID id, @RequestBody UserAction update) throws Exception {
        return super.update(id, update);
    }

    @DeleteMapping("/delete/{id}")
	public void deleteUserAction(@PathVariable UUID id) {
		super.delete(id);
	}
}
