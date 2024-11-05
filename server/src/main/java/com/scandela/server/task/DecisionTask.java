package com.scandela.server.task;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DecisionTask {
	
	@Scheduled(fixedRate = 3600000)
	public void testTask() {
		Logger log = LoggerFactory.getLogger(DecisionTask.class);
		SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
		
		log.info("The time is now {}", dateFormat.format(new Date()));
	}
}
