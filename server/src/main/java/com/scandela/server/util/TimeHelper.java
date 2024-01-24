package com.scandela.server.util;

import java.time.LocalTime;
import java.util.Calendar;
import java.util.TimeZone;

import com.luckycatlabs.sunrisesunset.SunriseSunsetCalculator;
import com.luckycatlabs.sunrisesunset.dto.Location;

public class TimeHelper {
	static public LocalTime getSunsetTime(double townLat, double townLng) {
		SunriseSunsetCalculator calculator = new SunriseSunsetCalculator(new Location(townLat, townLng), "Europe/Paris");
		Calendar date = Calendar.getInstance(TimeZone.getTimeZone("Europe/Paris"));
		String sunset = calculator.getOfficialSunsetForDate(date);
		
		return LocalTime.parse(sunset);
	}
	
	static public LocalTime getSunriseTime(double townLat, double townLng) {
		SunriseSunsetCalculator calculator = new SunriseSunsetCalculator(new Location(townLat, townLng), "Europe/Paris");
		Calendar date = Calendar.getInstance(TimeZone.getTimeZone("Europe/Paris"));
		String sunset = calculator.getOfficialSunriseForDate(date);
		
		return LocalTime.parse(sunset);
	}
}
