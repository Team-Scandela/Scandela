package com.scandela.server.task;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

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
	
	// Every 2 hours
	@Scheduled(timeUnit = TimeUnit.MINUTES, fixedRate = 121)
	public void taskGetWeatherDecision() throws Exception {
		decisionService.deleteAllByDescriptionContaining("Temps actuel ");
		decisionService.algoReductionConsoHoraireWeather();
		
		writeLog("taskGetWeatherDecision");
	}
	
	// Every day at 10
	@Scheduled(cron = "0 0 10 * * *")
	public void taskGetAllumerEteindreDecision() throws Exception {
		decisionService.deleteAllByDescriptionContaining("Coucher du soleil à ");
		decisionService.deleteAllByDescriptionContaining("Lever du soleil à ");
		decisionService.algoReductionConsoHoraire();

		writeLog("taskGetAllumerEteindreDecision");
	}
	
	// Every Sunday at 0
	@Scheduled(cron = "0 0 0 * * 0")
	public void taskGetWeekDecision() throws Exception {
		decisionService.algoChangementBulb();

		decisionService.deleteAllByDescriptionContaining("La distance entre 2 lampadaire n'est pas respectée.");
		decisionService.algoAjouterLampadaire();

		decisionService.deleteAllByDescriptionContaining("La distance entre les lampadaires n'est pas optimale.");
		decisionService.algoRetirerLampadaire();

		decisionService.deleteAllBySolutionContaining("Augmenter l'intensité du lampadaire de ");
		decisionService.algoAugmenterIntensiteLampadaire();

		decisionService.deleteAllBySolutionContaining("Réduire l'intensité du lampadaire de ");
		decisionService.algoReduireIntensiteLampadaire();

		writeLog("taskGetWeekDecision");
	}
	
	private void writeLog(String taskName) {
		Logger log = LoggerFactory.getLogger(DecisionTask.class);
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy HH:mm:ss");
		
		log.info("{} at date {}", taskName, dateFormat.format(new Date()));
	}
}