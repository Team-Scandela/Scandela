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

import com.scandela.server.dao.IncidentDao;
import com.scandela.server.dao.LampIncidentDao;
import com.scandela.server.entity.Incident;
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
	private IncidentDao incidentDaoMock;
	
	private final long id = 1;
	private final Incident incident = Incident.builder().id(id).build();
	private final LampIncident lampIncident = LampIncident.builder()
			.id(id)
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
		assertThat(resultedLampIncident.getIncident()).isEqualTo(lampIncident.getIncident());
	}
	
	@Test
	public void testGetAll_whenManyLampIncidents_thenReturnManyLampIncidents() {
		LampIncident lampIncident2 = LampIncident.builder()
				.id(Long.valueOf(2))
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
		when(incidentDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(incident));
		
		LampIncident result = testedObject.create(lampIncident);

		verify(lampIncidentDaoMock, times(1)).save(Mockito.any(LampIncident.class));
		verify(incidentDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getId()).isEqualTo(lampIncident.getId());
		assertThat(result.getIncident()).isEqualTo(lampIncident.getIncident());
	}
	
	@Test
	public void testCreate_whenIncidentIsNull_thenReturnThrowLampIncidentException() {
		lampIncident.setIncident(null);
		
		LampIncidentException result = assertThrows(LampIncidentException.class, () -> testedObject.create(lampIncident));
		
		verify(lampIncidentDaoMock, times(0)).save(Mockito.any(LampIncident.class));
		verify(incidentDaoMock, times(0)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(LampIncidentException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenIncidentNotFound_thenThrowLampIncidentException() throws LampIncidentException {
		when(incidentDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.empty());
		
		LampIncidentException result = assertThrows(LampIncidentException.class, () -> testedObject.create(lampIncident));

		verify(lampIncidentDaoMock, times(0)).save(Mockito.any(LampIncident.class));
		verify(incidentDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(LampIncidentException.INCIDENT_LOADING);
	}

	@Test
	public void testDelete() {
		testedObject.delete(lampIncident);

		verify(lampIncidentDaoMock, times(1)).delete(lampIncident);
	}
	
}
