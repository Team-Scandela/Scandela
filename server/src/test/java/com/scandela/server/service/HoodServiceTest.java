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

import com.scandela.server.dao.HoodDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.entity.Hood;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.HoodException;
import com.scandela.server.service.implementation.HoodService;

@RunWith(MockitoJUnitRunner.class)
public class HoodServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private HoodService testedObject;
	
	@Mock
	private HoodDao hoodDaoMock;
	
	@Mock
	private TownDao townDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String name = "Test";
	private final Town town = Town.builder().id(id).build();
	private final Hood hood = Hood.builder()
			.id(id)
			.town(town)
			.name(name)
			.latitude(3.4543)
			.longitude(89.0913)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(hoodDaoMock.findAll()).thenReturn(Arrays.asList(hood));
		
		List<Hood> result = testedObject.getAll();
		
		verify(hoodDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Hood resultedHood = result.get(0);
		assertThat(resultedHood.getId()).isEqualTo(hood.getId());
		assertThat(resultedHood.getTown()).isEqualTo(hood.getTown());
		assertThat(resultedHood.getName()).isEqualTo(hood.getName());
		assertThat(resultedHood.getLatitude()).isEqualTo(hood.getLatitude());
		assertThat(resultedHood.getLongitude()).isEqualTo(hood.getLongitude());
	}
	
	@Test
	public void testGetAll_whenManyHoods_thenReturnManyHoods() {
		Hood hood2 = Hood.builder()
				.id(UUID.randomUUID())
				.name("Test2")
				.town(town)
				.latitude(89.0913)
				.longitude(3.4543)
				.build();
		
		when(hoodDaoMock.findAll()).thenReturn(Arrays.asList(hood, hood2));
		
		List<Hood> result = testedObject.getAll();
		
		verify(hoodDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoHood_thenReturnEmptyList() {
		when(hoodDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Hood> result = testedObject.getAll();

		verify(hoodDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(hoodDaoMock.findById(id)).thenReturn(Optional.of(hood));
		
		Hood result = testedObject.get(id);
		
		verify(hoodDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(hood.getId());
		assertThat(result.getTown()).isEqualTo(hood.getTown());
		assertThat(result.getName()).isEqualTo(hood.getName());
		assertThat(result.getLatitude()).isEqualTo(hood.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(hood.getLongitude());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(hoodDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Hood result = testedObject.get(id);

		verify(hoodDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws HoodException {
		when(hoodDaoMock.save(Mockito.any(Hood.class))).thenReturn(hood);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		Hood result = testedObject.create(hood);

		verify(hoodDaoMock, times(1)).save(Mockito.any(Hood.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(hood.getId());
		assertThat(result.getTown()).isEqualTo(hood.getTown());
		assertThat(result.getName()).isEqualTo(hood.getName());
		assertThat(result.getLatitude()).isEqualTo(hood.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(hood.getLongitude());
	}
	
	@Test
	public void testCreate_whenNameIsNull_thenReturnThrowHoodException() {
		hood.setName(null);

		when(hoodDaoMock.save(Mockito.any(Hood.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		HoodException result = assertThrows(HoodException.class, () -> testedObject.create(hood));

		verify(hoodDaoMock, times(1)).save(Mockito.any(Hood.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(HoodException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenTownIsNull_thenReturnThrowHoodException() {
		hood.setTown(null);
		
		HoodException result = assertThrows(HoodException.class, () -> testedObject.create(hood));
		
		verify(hoodDaoMock, times(0)).save(Mockito.any(Hood.class));
		verify(townDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(HoodException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLatitudeIsNull_thenReturnThrowHoodException() {
		hood.setLatitude(null);

		when(hoodDaoMock.save(Mockito.any(Hood.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		HoodException result = assertThrows(HoodException.class, () -> testedObject.create(hood));

		verify(hoodDaoMock, times(1)).save(Mockito.any(Hood.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(HoodException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLongitudeIsNull_thenReturnThrowHoodException() {
		hood.setLongitude(null);

		when(hoodDaoMock.save(Mockito.any(Hood.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		HoodException result = assertThrows(HoodException.class, () -> testedObject.create(hood));

		verify(hoodDaoMock, times(1)).save(Mockito.any(Hood.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(HoodException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenTownNotFound_thenThrowHoodException() throws HoodException {
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		HoodException result = assertThrows(HoodException.class, () -> testedObject.create(hood));

		verify(hoodDaoMock, times(0)).save(Mockito.any(Hood.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(HoodException.TOWN_LOADING);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		String name2 = "Test2";
		Hood hood2 = Hood.builder()
				.id(id2)
				.name(name2)
				.latitude(1878.01)
				.longitude(1371.0913)
				.build();
		
		when(hoodDaoMock.findById(id)).thenReturn(Optional.ofNullable(hood));
		
		Hood result = testedObject.update(id, hood2);
		
		assertThat(result.getId()).isEqualTo(id);
		assertThat(result.getName()).isEqualTo(hood2.getName());
		assertThat(result.getLatitude()).isEqualTo(hood2.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(hood2.getLongitude());
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(hoodDaoMock, times(1)).deleteById(id);
	}
	
}
