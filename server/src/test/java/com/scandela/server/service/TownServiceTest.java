package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
	
	private final UUID id = UUID.randomUUID();
	private final String name = "Test";
	private final float electricityPrice = 17;
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
	public void testGetAll() {
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
	public void testGetAll_whenManyTowns_thenReturnManyTowns() {
		Town town2 = Town.builder()
				.id(UUID.randomUUID())
				.name("Test2")
				.hoods(hoods)
				.latitude(89.0913)
				.longitude(3.4543)
				.electricityPrice(32f)
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
	public void testGetAll_whenNoTown_thenReturnEmptyList() {
		when(townDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Town> result = testedObject.getAll();

		verify(townDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
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
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(townDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Town result = testedObject.get(id);

		verify(townDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws TownException {
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
	public void testCreate_whenNameIsNull_thenReturnThrowTownException() {
		town.setName(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLatitudeIsNull_thenReturnThrowTownException() {
		town.setLatitude(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLongitudeIsNull_thenReturnThrowTownException() {
		town.setLongitude(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenElectricityPriceIsNull_thenReturnThrowTownException() {
		town.setElectricityPrice(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenIndiceElectricityIsNull_thenReturnThrowTownException() {
		town.setIndiceElectricity(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenIndiceEcologyIsNull_thenReturnThrowTownException() {
		town.setIndiceEcology(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenIndiceQualityIsNull_thenReturnThrowTownException() {
		town.setIndiceQuality(null);

		when(townDaoMock.save(Mockito.any(Town.class))).thenThrow(DataIntegrityViolationException.class);
		
		TownException result = assertThrows(TownException.class, () -> testedObject.create(town));

		verify(townDaoMock, times(1)).save(Mockito.any(Town.class));
		assertThat(result.getMessage()).isEqualTo(TownException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		String name2 = "Test2";
		float electricityPrice2 = 17131;
		float indiceElectricity2 = 1313.17f;
		float indiceEcology2 = 1131.45f;
		float indiceQuality2 = 1313.78f;
		Town town2 = Town.builder()
				.id(id2)
				.name(name2)
				.latitude(31133.4543)
				.longitude(891313.0913)
				.electricityPrice(electricityPrice2)
				.indiceElectricity(indiceElectricity2)
				.indiceEcology(indiceEcology2)
				.indiceQuality(indiceQuality2)
				.build();
		
		
		when(townDaoMock.findById(id)).thenReturn(Optional.ofNullable(town));
		
		Town result = testedObject.update(id, town2);

		assertThat(result.getId()).isEqualTo(id);
		assertThat(result.getName()).isEqualTo(town2.getName());
		assertThat(result.getLatitude()).isEqualTo(town2.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(town2.getLongitude());
		assertThat(result.getElectricityPrice()).isEqualTo(town2.getElectricityPrice());
		assertThat(result.getIndiceElectricity()).isEqualTo(town2.getIndiceElectricity());
		assertThat(result.getIndiceEcology()).isEqualTo(town2.getIndiceEcology());
		assertThat(result.getIndiceQuality()).isEqualTo(town2.getIndiceQuality());
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(townDaoMock, times(1)).deleteById(id);
	}
	
}
