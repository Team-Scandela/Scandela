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

import com.scandela.server.dao.IncidentDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.entity.Incident;
import com.scandela.server.entity.LampIncident;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.IncidentException;
import com.scandela.server.service.implementation.IncidentService;

@RunWith(MockitoJUnitRunner.class)
public class IncidentServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private IncidentService testedObject;
	
	@Mock
	private IncidentDao incidentDaoMock;
	
	@Mock
	private TownDao townDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String title = "Title";
	private final String description = "Description";
	private final Town town = Town.builder().id(id).build();
	private final float impactElectricity = 0.17f;
	private final float impactEcology = 0.45f;
	private final float impactQuality = 0.78f;
	private final List<LampIncident> lampIncidents = Arrays.asList(LampIncident.builder().id(id).build());
	private final Incident incident = Incident.builder()
			.id(id)
			.town(town)
			.title(title)
			.description(description)
			.impactElectricity(impactElectricity)
			.impactEcology(impactEcology)
			.impactQuality(impactQuality)
			.lampIncidents(lampIncidents)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(incidentDaoMock.findAll()).thenReturn(Arrays.asList(incident));
		
		List<Incident> result = testedObject.getAll();
		
		verify(incidentDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Incident resultedIncident = result.get(0);
		assertThat(resultedIncident.getId()).isEqualTo(incident.getId());
		assertThat(resultedIncident.getTown()).isEqualTo(incident.getTown());
		assertThat(resultedIncident.getTitle()).isEqualTo(incident.getTitle());
		assertThat(resultedIncident.getDescription()).isEqualTo(incident.getDescription());
		assertThat(resultedIncident.getImpactElectricity()).isEqualTo(incident.getImpactElectricity());
		assertThat(resultedIncident.getImpactEcology()).isEqualTo(incident.getImpactEcology());
		assertThat(resultedIncident.getImpactQuality()).isEqualTo(incident.getImpactQuality());
		assertThat(resultedIncident.getLampIncidents()).hasSize(incident.getLampIncidents().size());
	}
	
	@Test
	public void testGetAll_whenManyIncidents_thenReturnManyIncidents() {
		Incident incident2 = Incident.builder()
				.id(UUID.randomUUID())
				.town(town)
				.title(title)
				.description(description)
				.impactElectricity(impactElectricity)
				.impactEcology(impactEcology)
				.impactQuality(impactQuality)
				.lampIncidents(lampIncidents)
				.build();
		
		when(incidentDaoMock.findAll()).thenReturn(Arrays.asList(incident, incident2));
		
		List<Incident> result = testedObject.getAll();
		
		verify(incidentDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoIncident_thenReturnEmptyList() {
		when(incidentDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Incident> result = testedObject.getAll();

		verify(incidentDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(incidentDaoMock.findById(id)).thenReturn(Optional.of(incident));
		
		Incident result = testedObject.get(id);
		
		verify(incidentDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(incident.getId());
		assertThat(result.getTown()).isEqualTo(incident.getTown());
		assertThat(result.getTitle()).isEqualTo(incident.getTitle());
		assertThat(result.getDescription()).isEqualTo(incident.getDescription());
		assertThat(result.getImpactElectricity()).isEqualTo(incident.getImpactElectricity());
		assertThat(result.getImpactEcology()).isEqualTo(incident.getImpactEcology());
		assertThat(result.getImpactQuality()).isEqualTo(incident.getImpactQuality());
		assertThat(result.getLampIncidents()).hasSize(incident.getLampIncidents().size());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(incidentDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Incident result = testedObject.get(id);

		verify(incidentDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws IncidentException {
		when(incidentDaoMock.save(Mockito.any(Incident.class))).thenReturn(incident);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		Incident result = testedObject.create(incident);

		verify(incidentDaoMock, times(1)).save(Mockito.any(Incident.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(incident.getId());
		assertThat(result.getTown()).isEqualTo(incident.getTown());
		assertThat(result.getTitle()).isEqualTo(incident.getTitle());
		assertThat(result.getDescription()).isEqualTo(incident.getDescription());
		assertThat(result.getImpactElectricity()).isEqualTo(incident.getImpactElectricity());
		assertThat(result.getImpactEcology()).isEqualTo(incident.getImpactEcology());
		assertThat(result.getImpactQuality()).isEqualTo(incident.getImpactQuality());
		assertThat(result.getLampIncidents()).hasSize(incident.getLampIncidents().size());
	}
	
	@Test
	public void testCreate_whenTitleIsNull_thenReturnThrowIncidentException() {
		incident.setTitle(null);

		when(incidentDaoMock.save(Mockito.any(Incident.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		IncidentException result = assertThrows(IncidentException.class, () -> testedObject.create(incident));

		verify(incidentDaoMock, times(1)).save(Mockito.any(Incident.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(IncidentException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenTownIsNull_thenReturnThrowIncidentException() {
		incident.setTown(null);
		
		IncidentException result = assertThrows(IncidentException.class, () -> testedObject.create(incident));
		
		verify(incidentDaoMock, times(0)).save(Mockito.any(Incident.class));
		verify(townDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(IncidentException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenDescriptionIsNull_thenReturnThrowIncidentException() {
		incident.setDescription(null);

		when(incidentDaoMock.save(Mockito.any(Incident.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		IncidentException result = assertThrows(IncidentException.class, () -> testedObject.create(incident));

		verify(incidentDaoMock, times(1)).save(Mockito.any(Incident.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(IncidentException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenTownNotFound_thenThrowIncidentException() throws IncidentException {
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		IncidentException result = assertThrows(IncidentException.class, () -> testedObject.create(incident));

		verify(incidentDaoMock, times(0)).save(Mockito.any(Incident.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(IncidentException.TOWN_LOADING);
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(incidentDaoMock, times(1)).deleteById(id);
	}
	
}
