package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
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
import org.springframework.data.util.Pair;

import com.scandela.server.dao.BulbDao;
import com.scandela.server.dao.CabinetDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampShadeDao;
import com.scandela.server.dao.StreetDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.dao.WhileAwayDao;
import com.scandela.server.entity.Bulb;
import com.scandela.server.entity.Cabinet;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampShade;
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
	
	@Mock
	private CabinetDao cabinetDaoMock;
	
	@Mock
	private LampShadeDao lampShadeDaoMock;
	
	@Mock
	private WhileAwayDao whileAwayDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String name = "AAA1";
	private final double latitude = 17.11;
	private final double longitude = 17.17;
	private final double height = 5.01;
	private final LocalTime lightOn = LocalTime.now();
	private final LocalTime lightOff = LocalTime.now().plusHours(4);
	private final Town town = Town.builder().id(id).build();
	private final Street street = Street.builder().id(id).build();
	private final Bulb bulb = Bulb.builder().id(id).build();
	private final Cabinet cabinet = Cabinet.builder().id(id).build();
	private final LampShade lampShade = LampShade.builder().id(id).build();
	private final String moreInformations = "test";
	private final Lamp lamp = Lamp.builder()
			.id(id)
			.name(name)
			.bulb(bulb)
			.town(town)
			.street(street)
			.cabinet(cabinet)
			.lampShade(lampShade)
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
		assertThat(resultedLamp.getCabinet()).isEqualTo(lamp.getCabinet());
		assertThat(resultedLamp.getLampShade()).isEqualTo(lamp.getLampShade());
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
				.cabinet(cabinet)
				.lampShade(lampShade)
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
	public void testGetAll_withName() {
		when(lampDaoMock.findByName(lamp.getName())).thenReturn(Arrays.asList(lamp));
		
		List<Lamp> result = testedObject.getAll(lamp.getName());
		
		verify(lampDaoMock, never()).findAll();
		verify(lampDaoMock, times(1)).findByName(lamp.getName());
		assertThat(result).isNotEmpty();
		assertThat(result.get(0).getId()).isEqualTo(lamp.getId());
	}
	
	@Test
	public void testGetAll_withName_whenNameIsNull_thenReturnAllLamps() {
		Lamp lamp2 = Lamp.builder()
				.id(UUID.randomUUID())
				.bulb(bulb)
				.town(town)
				.street(street)
				.cabinet(cabinet)
				.lampShade(lampShade)
				.latitude(latitude)
				.longitude(longitude)
				.lightOff(lightOff)
				.lightOn(lightOn)
				.height(height)
				.moreInformations(moreInformations)
				.build();
		
		when(lampDaoMock.findAll()).thenReturn(Arrays.asList(lamp, lamp2));
		
		List<Lamp> result = testedObject.getAll(null);
		
		verify(lampDaoMock, times(1)).findAll();
		verify(lampDaoMock, never()).findByName(Mockito.anyString());
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_withName_whenNameIsBlank_thenReturnAllLamps() {
		Lamp lamp2 = Lamp.builder()
				.id(UUID.randomUUID())
				.bulb(bulb)
				.town(town)
				.street(street)
				.cabinet(cabinet)
				.lampShade(lampShade)
				.latitude(latitude)
				.longitude(longitude)
				.lightOff(lightOff)
				.lightOn(lightOn)
				.height(height)
				.moreInformations(moreInformations)
				.build();
		
		when(lampDaoMock.findAll()).thenReturn(Arrays.asList(lamp, lamp2));
		
		List<Lamp> result = testedObject.getAll("      ");
		
		verify(lampDaoMock, times(1)).findAll();
		verify(lampDaoMock, never()).findByName(Mockito.anyString());
		assertThat(result).hasSize(2);
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
		assertThat(result.getCabinet()).isEqualTo(lamp.getCabinet());
		assertThat(result.getLampShade()).isEqualTo(lamp.getLampShade());
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
		// when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		// when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		// when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
		// when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
		// when(lampShadeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lampShade));
		
		Lamp result = testedObject.create(lamp);

		verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
		// verify(townDaoMock, times(1)).findById(Mockito.any());
		// verify(streetDaoMock, times(1)).findById(Mockito.any());
		// verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(lamp.getId());
		assertThat(result.getBulb()).isEqualTo(lamp.getBulb());
		assertThat(result.getTown()).isEqualTo(lamp.getTown());
		assertThat(result.getStreet()).isEqualTo(lamp.getStreet());
		assertThat(result.getCabinet()).isEqualTo(lamp.getCabinet());
		assertThat(result.getLampShade()).isEqualTo(lamp.getLampShade());
		assertThat(result.getLatitude()).isEqualTo(lamp.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(lamp.getLongitude());
		assertThat(result.getLightOff()).isEqualTo(lamp.getLightOff());
		assertThat(result.getLightOn()).isEqualTo(lamp.getLightOn());
		assertThat(result.getMoreInformations()).isEqualTo(lamp.getMoreInformations());
	}
	
	// @Test
	// public void testCreate_whenTownIsNull_thenReturnThrowLampException() {
	// 	lamp.setTown(null);
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));
		
	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, never()).findById(Mockito.any());
	// 	verify(streetDaoMock, never()).findById(Mockito.any());
	// 	verify(bulbDaoMock, never()).findById(Mockito.any());
	// 	verify(cabinetDaoMock, never()).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenTownNotFound_thenThrowLampException() throws LampException {
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, never()).findById(Mockito.any());
	// 	verify(bulbDaoMock, never()).findById(Mockito.any());
	// 	verify(cabinetDaoMock, never()).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.TOWN_LOADING);
	// }
	
	// @Test
	// public void testCreate_whenBulbIsNull_thenReturnThrowLampException() {
	// 	lamp.setBulb(null);
		
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));
		
	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, never()).findById(Mockito.any());
	// 	verify(cabinetDaoMock, never()).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenBulbNotFound_thenThrowLampException() throws LampException {
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, never()).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.BULB_LOADING);
	// }
	
	// @Test
	// public void testCreate_whenStreetIsNull_thenReturnThrowLampException() {
	// 	lamp.setStreet(null);
		
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));
		
	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, never()).findById(Mockito.any());
	// 	verify(bulbDaoMock, never()).findById(Mockito.any());
	// 	verify(cabinetDaoMock, never()).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenStreetNotFound_thenThrowLampException() throws LampException {
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, never()).findById(Mockito.any());
	// 	verify(cabinetDaoMock, never()).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.STREET_LOADING);
	// }
	
	// @Test
	// public void testCreate_whenCabinetIsNull_thenReturnThrowLampException() {
	// 	lamp.setCabinet(null);
		
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));
		
	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, never()).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenCabinetNotFound_thenThrowLampException() throws LampException {
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
	// 	when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.CABINET_LOADING);
	// }
	
	// @Test
	// public void testCreate_whenLampShadeIsNull_thenReturnThrowLampException() {
	// 	lamp.setLampShade(null);
		
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
	// 	when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));
		
	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, never()).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenLampShadeNotFound_thenThrowLampException() throws LampException {
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
	// 	when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
	// 	when(lampShadeDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, never()).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, times(1)).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.LAMPSHADE_LOADING);
	// }
	
	// @Test
	// public void testCreate_whenLatitudeIsNull_thenReturnThrowLampException() {
	// 	lamp.setLatitude(null);

	// 	when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
	// 	when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
	// 	when(lampShadeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lampShade));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, times(1)).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenLongitudeIsNull_thenReturnThrowLampException() {
	// 	lamp.setLongitude(null);

	// 	when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
	// 	when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
	// 	when(lampShadeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lampShade));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, times(1)).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenLightOffIsNull_thenReturnThrowLampException() {
	// 	lamp.setLightOff(null);

	// 	when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
	// 	when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
	// 	when(lampShadeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lampShade));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, times(1)).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenLightOnIsNull_thenReturnThrowLampException() {
	// 	lamp.setLightOn(null);

	// 	when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
	// 	when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
	// 	when(lampShadeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lampShade));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any());
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, times(1)).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	// @Test
	// public void testCreate_whenHeightIsNull_thenReturnThrowLampException() {
	// 	lamp.setHeight(null);

	// 	when(lampDaoMock.save(Mockito.any(Lamp.class))).thenThrow(DataIntegrityViolationException.class);
	// 	when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
	// 	when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
	// 	when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
	// 	when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
	// 	when(lampShadeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lampShade));
		
	// 	LampException result = assertThrows(LampException.class, () -> testedObject.create(lamp));

	// 	verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
	// 	verify(townDaoMock, times(1)).findById(Mockito.any(F));
	// 	verify(streetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(bulbDaoMock, times(1)).findById(Mockito.any());
	// 	verify(cabinetDaoMock, times(1)).findById(Mockito.any());
	// 	verify(lampShadeDaoMock, times(1)).findById(Mockito.any());
	// 	assertThat(result.getMessage()).isEqualTo(LampException.INCOMPLETE_INFORMATIONS);
	// }
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		double latitude2 = 113317.11;
		double longitude2 = 1712131.17;
		double height2 = 51231.01;
		LocalTime lightOn2 = LocalTime.now().minusHours(2);
		LocalTime lightOff2 = LocalTime.now().plusHours(2);
		String moreInformations2 = "test2";
		Lamp lamp2 = Lamp.builder()
				.id(id2)
				.latitude(latitude2)
				.longitude(longitude2)
				.lightOff(lightOff2)
				.lightOn(lightOn2)
				.height(height2)
				.moreInformations(moreInformations2)
				.build();
		
		when(lampDaoMock.findById(id)).thenReturn(Optional.ofNullable(lamp));
		
		Lamp result = testedObject.update(id, lamp2);

		assertThat(result.getId()).isEqualTo(id);
		assertThat(result.getLatitude()).isEqualTo(lamp2.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(lamp2.getLongitude());
		assertThat(result.getHeight()).isEqualTo(lamp2.getHeight());
		assertThat(result.getLightOff()).isEqualTo(lamp2.getLightOff());
		assertThat(result.getLightOn()).isEqualTo(lamp2.getLightOn());
		assertThat(result.getMoreInformations()).isEqualTo(lamp2.getMoreInformations());
	}
	
	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(lampDaoMock, times(1)).deleteById(id);
	}
	
	@Test
	public void testGetAllByCoordinates() {
		List<Pair<Double, Double>> coordinates = Arrays.asList(
				Pair.of(47.200, -1.602),
				Pair.of(47.210, -1.620),
				Pair.of(47.300, -1.615),
				Pair.of(47.240, -1.442)
			);
		List<Lamp> lamps = Arrays.asList(
				Lamp.builder()
					.name("L1")
					.latitude(47.205165511621)
					.longitude(-1.485561685979863)
					.build(),
				Lamp.builder()
					.name("L2")
					.latitude(47.268184426201756)
					.longitude(-1.442078094051944)
					.build(),
				Lamp.builder()
					.name("L3")
					.latitude(47.20372988905886)
					.longitude(-1.602059008816147)
					.build(),
				Lamp.builder()
					.name("L4")
					.latitude(47.21045912051525)
					.longitude(-1.605581283201155)
					.build(),
				Lamp.builder()
					.name("L5")
					.latitude(47.25142239677325)
					.longitude(-1.536499996947058)
					.build()
			);
		List<String> resultsNameExpected = Arrays.asList( "L3", "L4", "L5" );
		
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(lamps);
		
		List<Lamp> result = testedObject.getAllByCoordinates(coordinates);
		
		assertThat(result).hasSize(3);
		assertThat(resultsNameExpected).contains(result.get(0).getName());
		assertThat(resultsNameExpected).contains(result.get(1).getName());
		assertThat(resultsNameExpected).contains(result.get(2).getName());
	}
	
}
