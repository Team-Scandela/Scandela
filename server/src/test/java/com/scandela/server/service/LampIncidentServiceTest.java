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

import com.scandela.server.dao.IncidentDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampIncidentDao;
import com.scandela.server.entity.Incident;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampIncident;
import com.scandela.server.exception.LampIncidentException;
import com.scandela.server.service.implementation.LampIncidentService;

@RunWith(MockitoJUnitRunner.class)
public class LampIncidentServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private LampIncidentService testedObject;
	
	@Mock
	private LampIncidentDao lampIncidentDaoMock;
	
	@Mock
	private LampDao lampDaoMock;
	
	@Mock
	private IncidentDao incidentDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final Lamp lamp = Lamp.builder().id(id).build();
	private final Incident incident = Incident.builder().id(id).build();
	private final LampIncident lampIncident = LampIncident.builder()
			.id(id)
			.lamp(lamp)
			.incident(incident)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(lampIncidentDaoMock.findAll()).thenReturn(Arrays.asList(lampIncident));
		
		List<LampIncident> result = testedObject.getAll();
		
		verify(lampIncidentDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		LampIncident resultedLampIncident = result.get(0);
		assertThat(resultedLampIncident.getId()).isEqualTo(lampIncident.getId());
		assertThat(resultedLampIncident.getLamp()).isEqualTo(lampIncident.getLamp());
		assertThat(resultedLampIncident.getIncident()).isEqualTo(lampIncident.getIncident());
	}
	
	@Test
	public void testGetAll_whenManyLampIncidents_thenReturnManyLampIncidents() {
		LampIncident lampIncident2 = LampIncident.builder()
				.id(UUID.randomUUID())
				.incident(incident)
				.build();
		
		when(lampIncidentDaoMock.findAll()).thenReturn(Arrays.asList(lampIncident, lampIncident2));
		
		List<LampIncident> result = testedObject.getAll();
		
		verify(lampIncidentDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoLampIncident_thenReturnEmptyList() {
		when(lampIncidentDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<LampIncident> result = testedObject.getAll();

		verify(lampIncidentDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(lampIncidentDaoMock.findById(id)).thenReturn(Optional.of(lampIncident));
		
		LampIncident result = testedObject.get(id);
		
		verify(lampIncidentDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(lampIncident.getId());
		assertThat(result.getLamp()).isEqualTo(lampIncident.getLamp());
		assertThat(result.getIncident()).isEqualTo(lampIncident.getIncident());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(lampIncidentDaoMock.findById(id)).thenReturn(Optional.empty());
		
		LampIncident result = testedObject.get(id);

		verify(lampIncidentDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws LampIncidentException {
		when(lampIncidentDaoMock.save(Mockito.any(LampIncident.class))).thenReturn(lampIncident);
		when(lampDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lamp));
		when(incidentDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(incident));
		
		LampIncident result = testedObject.create(lampIncident);

		verify(lampIncidentDaoMock, times(1)).save(Mockito.any(LampIncident.class));
		verify(lampDaoMock, times(1)).findById(Mockito.any());
		verify(incidentDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(lampIncident.getId());
		assertThat(result.getLamp()).isEqualTo(lampIncident.getLamp());
		assertThat(result.getIncident()).isEqualTo(lampIncident.getIncident());
	}
	
	@Test
	public void testCreate_whenLampIsNull_thenReturnThrowLampIncidentException() {
		lampIncident.setLamp(null);
		
		LampIncidentException result = assertThrows(LampIncidentException.class, () -> testedObject.create(lampIncident));
		
		verify(lampIncidentDaoMock, times(0)).save(Mockito.any(LampIncident.class));
		verify(lampDaoMock, times(0)).findById(Mockito.any());
		verify(incidentDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampIncidentException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLampNotFound_thenThrowLampIncidentException() throws LampIncidentException {
		when(lampDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		LampIncidentException result = assertThrows(LampIncidentException.class, () -> testedObject.create(lampIncident));

		verify(lampIncidentDaoMock, times(0)).save(Mockito.any(LampIncident.class));
		verify(lampDaoMock, times(1)).findById(Mockito.any());
		verify(incidentDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampIncidentException.LAMP_LOADING);
	}
	
	@Test
	public void testCreate_whenIncidentIsNull_thenReturnThrowLampIncidentException() {
		when(lampDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lamp));
		
		lampIncident.setIncident(null);
		
		LampIncidentException result = assertThrows(LampIncidentException.class, () -> testedObject.create(lampIncident));
		
		verify(lampIncidentDaoMock, times(0)).save(Mockito.any(LampIncident.class));
		verify(lampDaoMock, times(1)).findById(Mockito.any());
		verify(incidentDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampIncidentException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenIncidentNotFound_thenThrowLampIncidentException() throws LampIncidentException {
		when(lampDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lamp));
		when(incidentDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		LampIncidentException result = assertThrows(LampIncidentException.class, () -> testedObject.create(lampIncident));

		verify(lampIncidentDaoMock, times(0)).save(Mockito.any(LampIncident.class));
		verify(lampDaoMock, times(1)).findById(Mockito.any());
		verify(incidentDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampIncidentException.INCIDENT_LOADING);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		LampIncident lampIncident2 = LampIncident.builder()
				.id(id2)
				.build();
		
		when(lampIncidentDaoMock.findById(id)).thenReturn(Optional.ofNullable(lampIncident));
		
		LampIncident result = testedObject.update(id, lampIncident2);
		
		assertThat(result.getId()).isEqualTo(id);
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(lampIncidentDaoMock, times(1)).deleteById(id);
	}
	
}
