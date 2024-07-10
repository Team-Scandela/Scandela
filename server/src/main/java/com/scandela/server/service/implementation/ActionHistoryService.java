package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.UserActionDao;
import com.scandela.server.entity.UserAction;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IActionHistoryService;

@Service
public class ActionHistoryService extends AbstractService<UserAction> implements IActionHistoryService {

    protected ActionHistoryService(UserActionDao userActionDao) {
		super(userActionDao);
	}
}
