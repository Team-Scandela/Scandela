package com.scandela.server.service;

import java.util.List;
import java.util.UUID;

import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;

public interface IDecisionService extends IService<Decision> {
	public List<Decision> getAllByDecisionTypes(List<DecisionType> types);
	public List<Decision> algoChangementBulb() throws Exception;
	public List<Decision> algoReductionConsoHoraire() throws Exception;
	public List<Decision> algoReductionConsoHoraireWeather() throws Exception;
	public List<Decision> algoRetirerLampadaire() throws Exception;
	public List<Decision> algoAjouterLampadaire() throws Exception;
	public List<Decision> algoReduireIntensiteLampadaire() throws Exception;
	public List<Decision> algoAugmenterIntensiteLampadaire() throws Exception;
	public String getState(UUID idDecision) throws Exception;
	public void setState(UUID idDecision, String state) throws Exception;
}
