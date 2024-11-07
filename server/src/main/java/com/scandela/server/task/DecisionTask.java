package com.scandela.server.task;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.scandela.server.service.IDecisionService;

@Component
public class DecisionTask {
	
	private IDecisionService decisionService;
	
	// Constructors \\
	protected DecisionTask(IDecisionService decisionService) {
		this.decisionService = decisionService;
	}
	
	@Scheduled(fixedRate = 7205000)
	public void taskGetWeather() throws Exception {
		//TODO delete toutes les decisions existantes du weather et faire en sorte que la génération s'applique sur tous les lampadaires pas seulement sur un page -> verifier que ca bloque pas le reste
		decisionService.algoReductionConsoHoraireWeather();
		
		Logger log = LoggerFactory.getLogger(DecisionTask.class);
		SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
		
		log.info("Weather get at time {}", dateFormat.format(new Date()));
	}
}
