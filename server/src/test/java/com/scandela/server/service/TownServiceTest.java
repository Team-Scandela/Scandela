package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
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
import org.springframework.dao.DataIntegrityViolationException;

import com.scandela.server.dao.TownDao;
import com.scandela.server.entity.Hood;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.TownException;
import com.scandela.server.service.implementation.TownService;

@RunWith(MockitoJUnitRunner.class)
public class TownServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private TownService testedObject;
	
	@Mock
	private TownDao townDaoMock;
	
	private final long id = 1;
	private final String name = "Test";
	private final int electricityPrice = 17;
	private final float indiceElectricity = 0.17f;
	private final float indiceEcology = 0.45f;
	private final float indiceQuality = 0.78f;
	private final List<Hood> hoods = Arrays.asList(Hood.builder().build());
	private final Town town = Town.builder()
			.id(id)
			.hoods(hoods)
			.name(name)
			.latitude(3.4543)
			.longitude(89.0913)
			.electricityPrice(electricityPrice)
			.indiceElectricity(indiceElectricity)
			.indiceEcology(indiceEcology)
			.indiceQuality(indiceQuality)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetTowns() {
		when(townDaoMock.findAll()).thenReturn(Arrays.asList(town));
		
		List<Town> result = testedObject.getAll();
		
		verify(townDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Town resultedTown = result.get(0);
		assertThat(resultedTown.getId()).isEqualTo(town.getId());
		assertThat(resultedTown.getHoods()).hasSize(town.getHoods().size());
		assertThat(resultedTown.getName()).isEqualTo(town.getName());
		assertThat(resultedTown.getElectricityPrice()).isEqualTo(town.getElectricityPrice());
		assertThat(resultedTown.getIndiceElectricity()).isEqualTo(town.getIndiceElectricity());
		assertThat(resultedTown.getIndiceEcology()).isEqualTo(town.getIndiceEcology());
		assertThat(resultedTown.getIndiceQuality()).isEqualTo(town.getIndiceQuality());
	}
	
	@Test
	public void testGetTowns_whenManyTowns_thenReturnManyDtos() {
		Town town2 = Town.builder()
				.id(Long.valueOf(2))
				.name("Test2")
				.hoods(hoods)
				.latitude(89.0913)
				.longitude(3.4543)
				.electricityPrice(32)
				.indiceElectricity(0.45f)
				.indiceEcology(0.78f)
				.indiceQuality(0.17f)
				.build();
		
		when(townDaoMock.findAll()).thenReturn(Arrays.asList(town, town2));
		
		List<Town> result = testedObject.getAll();
		
		verify(townDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetTowns_whenNoTown_thenReturnEmptyList() {
		when(townDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Town> result = testedObject.getAll();

		verify(townDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGetTown() {
		when(townDaoMock.findById(id)).thenReturn(Optional.of(town));
		
		Town result = testedObject.get(id);
		
		verify(townDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(town.getId());
		assertThat(result.getHoods()).hasSize(town.getHoods().size());
		assertThat(result.getName()).isEqualTo(town.getName());
		assertThat(result.getElectricityPrice()).isEqualTo(town.getElectricityPrice());
		assertThat(result.getIndiceElectricity()).isEqualTo(town.getIndiceElectricity());
		assertThat(result.getIndiceEcology()).isEqualTo(town.getIndiceEcology());
		assertThat(result.getIndiceQuality()).isEqualTo(town.getIndiceQuality());
	}
	
	@Test
	public void testGetTown_whenIdNonExistant_thenReturnNull() {
		when(townDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Town result = testedObject.get(id);

		verify(townDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateTown() throws TownException {
		when(townDaoMock.save(Mockito.any(Town.class))).thenReturn(town);
		
		Town result = testedObject.create(town);

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getId()).isEqualTo(town.getId());
		assertThat(result.getHoods()).hasSize(town.getHoods().size());
		assertThat(result.getName()).isEqualTo(town.getName());
		assertThat(result.getElectricityPrice()).isEqualTo(town.getElectricityPrice());
		assertThat(result.getIndiceElectricity()).isEqualTo(town.getIndiceElectricity());
		assertThat(result.getIndiceEcology()).isEqualTo(town.getIndiceEcology());
		assertThat(result.getIndiceQuality()).isEqualTo(town.getIndiceQuality());
	}
	
	@Test
	public void testCreateTown_whenNameIsNull_thenReturnThrowTownException() {
		town.setName(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreateTown_whenLatitudeIsNull_thenReturnThrowTownException() {
		town.setLatitude(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreateTown_whenLongitudeIsNull_thenReturnThrowTownException() {
		town.setLongitude(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreateTown_whenElectricityPriceIsNull_thenReturnThrowTownException() {
		town.setElectricityPrice(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreateTown_whenIndiceElectricityIsNull_thenReturnThrowTownException() {
		town.setIndiceElectricity(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreateTown_whenIndiceEcologyIsNull_thenReturnThrowTownException() {
		town.setIndiceEcology(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreateTown_whenIndiceQualityIsNull_thenReturnThrowTownException() {
		town.setIndiceQuality(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}

	@Test
	public void testDeleteTown() {
		testedObject.delete(town);

		verify(townDaoMock, times(1)).delete(town);
	}
	
}
