package com.scandela.server.entity;

import java.io.Serializable;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "weather")
public class Weather implements Serializable {//TODO remplacer la latitude et longitude par une liaison avec town (update la lat et lng de nantes car fausses)

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
	@Column(name = "uuid", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "lat", nullable = false)
	private Double latitude;

	@Column(name = "lng", nullable = false)
	private Double longitude;

	@Column(name = "description", nullable = false)//TODO changer ca plus tard par le code
	private String description;

	@Column(name = "ts", nullable = false)
	private Long ts;

	@Column(name = "vis", nullable = false)
	private Integer vis;
	
	public String getTraductedDescription() {//TODO ici utiliser le code plus tard
		switch (description) {
		case "Thunderstorm with light rain": {
			return "Orage avec pluie légère";
		}
		case "Thunderstorm with rain": {
			return "Orage avec pluie";
		}
		case "Thunderstorm with heavy rain": {
			return "Orage avec forte pluie";
		}
		case "Thunderstorm with light drizzle": {
			return "Orage avec légère bruine";
		}
		case "Thunderstorm with drizzle": {
			return "Orage avec bruine";
		}
		case "Thunderstorm with heavy drizzle": {
			return "Orage avec forte bruine";
		}
		case "Thunderstorm with Hail": {
			return "Orage avec grêle";
		}
		case "Light Drizzle": {
			return "Légère bruine";
		}
		case "Drizzle": {
			return "Bruine";
		}
		case "Heavy Drizzle": {
			return "Forte bruine";
		}
		case "Light Rain": {
			return "Légère pluie";
		}
		case "Moderate Rain": {
			return "Pluie modérée";
		}
		case "Heavy Rain": {
			return "Forte pluie";
		}
		case "Freezing rain": {
			return "Pluie glaçante";
		}
		case "Light shower rain": {
			return "Pluie légère";
		}
		case "Shower rain": {
			return "Pluie";
		}
		case "Heavy shower rain": {
			return "Forte pluie";
		}
		case "Light snow": {
			return "Légère neige";
		}
		case "Snow": {
			return "Neige";
		}
		case "Heavy Snow": {
			return "Forte neige";
		}
		case "Mix snow/rain": {
			return "Mix de neige et pluie";
		}
		case "Sleet": {
			return "Neige fondue";
		}
		case "Heavy sleet": {
			return "Forte neige fondue";
		}
		case "Snow shower": {
			return "Neige";
		}
		case "Heavy snow shower": {
			return "Forte neige";
		}
		case "Flurries": {
			return "Averses de neige";
		}
		case "Mist": {
			return "Brume";
		}
		case "Smoke": {
			return "Brume";
		}
		case "Haze": {
			return "Brume";
		}
		case "Sand/dust": {
			return "Sable ou poussière dans l'air";
		}
		case "Fog": {
			return "Brouillard";
		}
		case "Freezing Fog": {
			return "Brouillard glaçant";
		}
		case "Clear sky": {
			return "Ciel éclairci";
		}
		case "Few clouds": {
			return "Ciel un peu nuageux";
		}
		case "Scattered clouds": {
			return "Ciel à nuages épars";
		}
		case "Broken clouds": {
			return "Ciel à nuages brisés";
		}
		case "Overcast clouds": {
			return "Ciel couvert";
		}
		default:
			return "Précipitation inconnue";
		}
	}
	
}
