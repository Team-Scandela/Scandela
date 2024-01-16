package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.Decision;

public interface IDecisionService extends IService<Decision> {
	public List<Decision> algoChangementBulb() throws Exception;
	public List<Decision> algoReductionConsoHoraire() throws Exception;
}
