package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.scandela.server.dao.criteria.TownCriteria;
import com.scandela.server.dao.implementation.TownDao;
import com.scandela.server.entity.Town;
import com.scandela.server.entity.dto.TownDto;
import com.scandela.server.service.implementation.TownService;

@RunWith(MockitoJUnitRunner.class)
public class TownServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private TownService testedObject;
	
	@Mock
	private TownDao townDaoMock;
	
	private final int id = 1;
	private final String name = "Test";
	private final int electricityPrice = 17;
	private final float indiceElectricity = 0.17f;
	private final float indiceEcology = 0.45f;
	private final float indiceQuality = 0.78f;
	private final Town town = Town.builder()
			.id(id)
			.name(name)
			.electricityPrice(electricityPrice)
			.indiceElectricity(indiceElectricity)
			.indiceEcology(indiceEcology)
			.indiceQuality(indiceQuality)
			.build();
	private final TownCriteria criteriaName = TownCriteria.builder()
			.name(name)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetTowns() {
		when(townDaoMock.getAll()).thenReturn(Arrays.asList(town));
		
		List<TownDto> result = testedObject.getTowns();
		
		verify(townDaoMock, times(1)).getAll();
		assertThat(result).hasSize(1);
		TownDto townDto = result.get(0);
		assertThat(townDto.getId()).isEqualTo(town.getId());
		assertThat(townDto.getName()).isEqualTo(town.getName());
		assertThat(townDto.getElectricityPrice()).isEqualTo(town.getElectricityPrice());
		assertThat(townDto.getIndiceElectricity()).isEqualTo(town.getIndiceElectricity());
		assertThat(townDto.getIndiceEcology()).isEqualTo(town.getIndiceEcology());
		assertThat(townDto.getIndiceQuality()).isEqualTo(town.getIndiceQuality());
	}
	
	@Test
	public void testGetTowns_whenManyTowns_thenReturnManyDtos() {
		Town town2 = Town.builder()
				.id(2)
				.name("Test2")
				.electricityPrice(32)
				.indiceElectricity(0.45f)
				.indiceEcology(0.78f)
				.indiceQuality(0.17f)
				.build();
		
		when(townDaoMock.getAll()).thenReturn(Arrays.asList(town, town2));
		
		List<TownDto> result = testedObject.getTowns();
		
		verify(townDaoMock, times(1)).getAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetTowns_whenNoTown_thenReturnEmptyList() {
		when(townDaoMock.getAll()).thenReturn(Arrays.asList());
		
		List<TownDto> result = testedObject.getTowns();

		verify(townDaoMock, times(1)).getAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGetTown() {
		when(townDaoMock.get(id)).thenReturn(Optional.of(town));
		
		TownDto result = testedObject.getTown(id);
		
		verify(townDaoMock, times(1)).get(id);
		assertThat(result.getId()).isEqualTo(town.getId());
		assertThat(result.getName()).isEqualTo(town.getName());
		assertThat(result.getElectricityPrice()).isEqualTo(town.getElectricityPrice());
		assertThat(result.getIndiceElectricity()).isEqualTo(town.getIndiceElectricity());
		assertThat(result.getIndiceEcology()).isEqualTo(town.getIndiceEcology());
		assertThat(result.getIndiceQuality()).isEqualTo(town.getIndiceQuality());
	}
	
	@Test
	public void testGetTown_whenIdNonExistant_thenReturnNull() {
		when(townDaoMock.get(id)).thenReturn(Optional.empty());
		
		TownDto result = testedObject.getTown(id);

		verify(townDaoMock, times(1)).get(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateTown() {
		when(townDaoMock.save(Mockito.any(Town.class))).thenReturn(town);
		
		TownDto result = testedObject.createTown(town);

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getId()).isEqualTo(town.getId());
		assertThat(result.getName()).isEqualTo(town.getName());
		assertThat(result.getElectricityPrice()).isEqualTo(town.getElectricityPrice());
		assertThat(result.getIndiceElectricity()).isEqualTo(town.getIndiceElectricity());
		assertThat(result.getIndiceEcology()).isEqualTo(town.getIndiceEcology());
		assertThat(result.getIndiceQuality()).isEqualTo(town.getIndiceQuality());
	}
	
	@Test
	public void testCreateTown_whenNameIsNull_thenReturnNull() {
		Town town = Town.builder().build();
		
		TownDto result = testedObject.createTown(town);

		verify(townDaoMock, times(0)).save(Mockito.any(Town.class));
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateTown_whenNameCriteriaCorrespond_thenReturnNull() {
		when(townDaoMock.getByCriteria(criteriaName)).thenReturn(Optional.of(town));
		
		TownDto result = testedObject.createTown(town);

		verify(townDaoMock, times(1)).getByCriteria(criteriaName);
		verify(townDaoMock, times(0)).save(Mockito.any(Town.class));
		assertThat(result).isNull();
	}

	@Test
	public void testDeleteTown() {
		testedObject.deleteTown(town);

		verify(townDaoMock, times(1)).delete(town);
	}
	
}
