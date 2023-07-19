package com.scandela.server.entity.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import com.scandela.server.entity.Town;

@RunWith(MockitoJUnitRunner.class)
public class TownDtoTest {
	
	// Methods \\
		// Public \\
	@Test
	public void testFrom() {
		Town town = Town.builder()
				.id(1)
				.name("Test")
				.electricityPrice(17)
				.indiceElectricity(0.17f)
				.indiceEcology(0.45f)
				.indiceQuality(0.78f)
				.build();
		
		TownDto result = TownDto.from(town);
		assertThat(result.getId()).isEqualTo(town.getId());
		assertThat(result.getName()).isEqualTo(town.getName());
		assertThat(result.getElectricityPrice()).isEqualTo(town.getElectricityPrice());
		assertThat(result.getIndiceElectricity()).isEqualTo(town.getIndiceElectricity());
		assertThat(result.getIndiceEcology()).isEqualTo(town.getIndiceEcology());
		assertThat(result.getIndiceQuality()).isEqualTo(town.getIndiceQuality());
	}

}
