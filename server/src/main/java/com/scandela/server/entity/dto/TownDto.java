package com.scandela.server.entity.dto;

import com.scandela.server.entity.Town;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TownDto {

	// Attributes \\
		// Private \\
	private int id;
	private String name;

	//TODO voir ce qu'est Iat et Ing

	private int electricityPrice;
	private float indiceElectricity;
	private float indiceEcology;
	private float indiceQuality;

	// Methods \\
		// Public \\
	public static TownDto from(Town town) {
		TownDto userDto = TownDto.builder()
				.id(town.getId())
				.name(town.getName())
				.electricityPrice(town.getElectricityPrice())
				.indiceElectricity(town.getIndiceElectricity())
				.indiceEcology(town.getIndiceEcology())
				.indiceQuality(town.getIndiceQuality())
				.build();

		return userDto;
	}

}
