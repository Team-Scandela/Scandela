package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.WhileAwayDao;
import com.scandela.server.entity.WhileAway;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IWhileAwayService;

@Service
public class WhileAwayService extends AbstractService<WhileAway> implements IWhileAwayService {

	// Attributes \\
		// Private \\

	private WhileAwayDao whileAwayDao;

	// Constructors \\
	protected WhileAwayService(WhileAwayDao whileAwayDao) {
		super(whileAwayDao);
	}

	// Methods \\
		// Public \\

}