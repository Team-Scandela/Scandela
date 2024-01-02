package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalTime;
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

import com.scandela.server.dao.BulbDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.StreetDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.entity.Bulb;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.Street;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.LampException;
import com.scandela.server.service.implementation.LampService;

@RunWith(MockitoJUnitRunner.class)
public class LampServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private LampService testedObject;
	
	@Mock
	private LampDao lampDaoMock;
	
	@Mock
	private TownDao townDaoMock;
	
	@Mock
	private StreetDao streetDaoMock;
	
	@Mock
	private BulbDao bulbDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final double latitude = 17.11;
	private final double longitude = 17.17;
	private final double height = 5.01;
	private final LocalTime lightOn = LocalTime.now();
	private final LocalTime lightOff = LocalTime.now().plusHours(4);
	private final Town town = Town.builder().id(id).build();
	private final Street street = Street.builder().id(id).build();
	private final Bulb bulb = Bulb.builder().id(id).build();
	private final String moreInformations = "test";
	private final Lamp lamp = Lamp.builder()
			.id(id)
			.bulb(bulb)
			.town(town)
			.street(street)
			.latitude(latitude)
			.longitude(longitude)
			.lightOff(lightOff)
			.lightOn(lightOn)
			.height(height)
			.moreInformations(moreInformations)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(lampDaoMock.findAll()).thenReturn(Arrays.asList(lamp));
		
		List<Lamp> result = testedObject.getAll();
		
		verify(lampDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Lamp resultedLamp = result.get(0);
		assertThat(resultedLamp.getId()).isEqualTo(lamp.getId());
		assertThat(resultedLamp.getBulb()).isEqualTo(lamp.getBulb());
		assertThat(resultedLamp.getTown()).isEqualTo(lamp.getTown());
		assertThat(resultedLamp.getStreet()).isEqualTo(lamp.getStreet());
		assertThat(resultedLamp.getLatitude()).isEqualTo(lamp.getLatitude());
		assertThat(resultedLamp.getLongitude()).isEqualTo(lamp.getLongitude());
		assertThat(resultedLamp.getLightOff()).isEqualTo(lamp.getLightOff());
		assertThat(resultedLamp.getLightOn()).isEqualTo(lamp.getLightOn());
		assertThat(resultedLamp.getMoreInformations()).isEqualTo(lamp.getMoreInformations());
	}
	
	@Test
	public void testGetAll_whenManyLamps_thenReturnManyLamps() {
		Lamp lamp2 = Lamp.builder()
				.id(UUID.randomUUID())
				.bulb(bulb)
				.town(town)
				.street(street)
				.latitude(latitude)
				.longitude(longitude)
				.lightOff(lightOff)
				.lightOn(lightOn)
				.height(height)
				.moreInformations(moreInformations)
				.build();
		
		when(lampDaoMock.findAll()).thenReturn(Arrays.asList(lamp, lamp2));
		
		List<Lamp> result = testedObject.getAll();
		
		verify(lampDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoLamp_thenReturnEmptyList() {
		when(lampDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Lamp> result = testedObject.getAll();

		verify(lampDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(lampDaoMock.findById(id)).thenReturn(Optional.of(lamp));
		
		Lamp result = testedObject.get(id);
		
		verify(lampDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(lamp.getId());
		assertThat(result.getBulb()).isEqualTo(lamp.getBulb());
		assertThat(result.getTown()).isEqualTo(lamp.getTown());
		assertThat(result.getStreet()).isEqualTo(lamp.getStreet());
		assertThat(result.getLatitude()).isEqualTo(lamp.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(lamp.getLongitude());
		assertThat(result.getLightOff()).isEqualTo(lamp.getLightOff());
		assertThat(result.getLightOn()).isEqualTo(lamp.getLightOn());
		assertThat(result.getMoreInformations()).isEqualTo(lamp.getMoreInformations());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(lampDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Lamp result = testedObject.get(id);

		verify(lampDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws LampException {
		when(lampDaoMock.save(Mockito.any(Lamp.class))).thenReturn(lamp);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
		
		Lamp result = testedObject.create(lamp);

		verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(lamp.getId());
		assertThat(result.getBulb()).isEqualTo(lamp.getBulb());
		assertThat(result.getTown()).isEqualTo(lamp.getTown());
		assertThat(result.getStreet()).isEqualTo(lamp.getStreet());
		assertThat(result.getLatitude()).isEqualTo(lamp.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(lamp.getLongitude());
		assertThat(result.getLightOff()).isEqualTo(lamp.getLightOff());
		assertThat(result.getLightOn()).isEqualTo(lamp.getLightOn());
		assertThat(result.getMoreInformations()).isEqualTo(lamp.getMoreInformations());
	}
	
	@Test
	public void testCreate_whenTownIsNull_thenReturnThrowLampException() {
		lamp.setTown(null);
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));
		
		verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
		verify(townDaoMock, never()).findById(Mockito.any());
		verify(streetDaoMock, never()).findById(Mockito.any());
		verify(bulbDaoMock, never()).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenTownNotFound_thenThrowLampException() throws LampException {
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

		verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, never()).findById(Mockito.any());
		verify(bulbDaoMock, never()).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.TOWN_LOADING);
	}
	
	@Test
	public void testCreate_whenBulbIsNull_thenReturnThrowLampException() {
		lamp.setBulb(null);
		
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));
		
		verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, never()).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenBulbNotFound_thenThrowLampException() throws LampException {
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

		verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.BULB_LOADING);
	}
	
	@Test
	public void testCreate_whenStreetIsNull_thenReturnThrowLampException() {
		lamp.setStreet(null);
		
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));
		
		verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, never()).findById(Mockito.any());
		verify(bulbDaoMock, never()).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenStreetNotFound_thenThrowLampException() throws LampException {
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

		verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, never()).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.STREET_LOADING);
	}
	
	@Test
	public void testCreate_whenLatitudeIsNull_thenReturnThrowLampException() {
		lamp.setLatitude(null);

		when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

		verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLongitudeIsNull_thenReturnThrowLampException() {
		lamp.setLongitude(null);

		when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

		verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLightOffIsNull_thenReturnThrowLampException() {
		lamp.setLightOff(null);

		when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

		verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLightOnIsNull_thenReturnThrowLampException() {
		lamp.setLightOn(null);

		when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

		verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenHeightIsNull_thenReturnThrowLampException() {
		lamp.setHeight(null);

		when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
		
		LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

		verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(lampDaoMock, times(1)).deleteById(id);
	}
	
}
