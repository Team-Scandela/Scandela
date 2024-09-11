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

import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampReparationDao;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampReparation;
import com.scandela.server.exception.LampReparationException;
import com.scandela.server.service.implementation.LampReparationService;

@RunWith(MockitoJUnitRunner.class)
public class LampReparationServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private LampReparationService testedObject;
	
	@Mock
	private LampReparationDao lampReparationDaoMock;
	
	@Mock
	private LampDao lampDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String title = "aaa";
	private final String description = "adad";
	private final Lamp lamp = Lamp.builder().id(id).build();
	private final LampReparation lampReparation = LampReparation.builder()
			.id(id)
			.title(title)
			.description(description)
			.lamp(lamp)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(lampReparationDaoMock.findAll()).thenReturn(Arrays.asList(lampReparation));
		
		List<LampReparation> result = testedObject.getAll();
		
		verify(lampReparationDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		LampReparation resultedLampReparation = result.get(0);
		assertThat(resultedLampReparation.getId()).isEqualTo(lampReparation.getId());
		assertThat(resultedLampReparation.getTitle()).isEqualTo(lampReparation.getTitle());
		assertThat(resultedLampReparation.getDescription()).isEqualTo(lampReparation.getDescription());
		assertThat(resultedLampReparation.getLamp()).isEqualTo(lampReparation.getLamp());
	}
	
	@Test
	public void testGetAll_whenManyLampReparations_thenReturnManyLampReparations() {
		LampReparation lampReparation2 = LampReparation.builder()
				.id(UUID.randomUUID())
				.title(title)
				.description(description)
				.lamp(lamp)
				.build();
		
		when(lampReparationDaoMock.findAll()).thenReturn(Arrays.asList(lampReparation, lampReparation2));
		
		List<LampReparation> result = testedObject.getAll();
		
		verify(lampReparationDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoLampReparation_thenReturnEmptyList() {
		when(lampReparationDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<LampReparation> result = testedObject.getAll();

		verify(lampReparationDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(lampReparationDaoMock.findById(id)).thenReturn(Optional.of(lampReparation));
		
		LampReparation result = testedObject.get(id);
		
		verify(lampReparationDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(lampReparation.getId());
		assertThat(result.getTitle()).isEqualTo(lampReparation.getTitle());
		assertThat(result.getDescription()).isEqualTo(lampReparation.getDescription());
		assertThat(result.getLamp()).isEqualTo(lampReparation.getLamp());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(lampReparationDaoMock.findById(id)).thenReturn(Optional.empty());
		
		LampReparation result = testedObject.get(id);

		verify(lampReparationDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws LampReparationException {
		when(lampReparationDaoMock.save(Mockito.any(LampReparation.class))).thenReturn(lampReparation);
		when(lampDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lamp));
		
		LampReparation result = testedObject.create(lampReparation);

		verify(lampReparationDaoMock, times(1)).save(Mockito.any(LampReparation.class));
		verify(lampDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(lampReparation.getId());
		assertThat(result.getTitle()).isEqualTo(lampReparation.getTitle());
		assertThat(result.getDescription()).isEqualTo(lampReparation.getDescription());
		assertThat(result.getLamp()).isEqualTo(lampReparation.getLamp());
	}
	
	@Test
	public void testCreate_whenLampIsNull_thenReturnThrowLampReparationException() {
		lampReparation.setLamp(null);
		
		LampReparationException result = assertThrows(LampReparationException.class, () -> testedObject.create(lampReparation));
		
		verify(lampReparationDaoMock, times(0)).save(Mockito.any(LampReparation.class));
		verify(lampDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampReparationException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLampNotFound_thenThrowLampReparationException() throws LampReparationException {
		when(lampDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		LampReparationException result = assertThrows(LampReparationException.class, () -> testedObject.create(lampReparation));

		verify(lampReparationDaoMock, times(0)).save(Mockito.any(LampReparation.class));
		verify(lampDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampReparationException.LAMP_LOADING);
	}
	
	@Test
	public void testCreate_whenTitleIsNull_thenReturnThrowLampReparationException() {
		when(lampReparationDaoMock.save(Mockito.any(LampReparation.class))).thenThrow(DataIntegrityViolationException.class);
		when(lampDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lamp));
		
		lampReparation.setTitle(null);
		
		LampReparationException result = assertThrows(LampReparationException.class, () -> testedObject.create(lampReparation));
		
		verify(lampReparationDaoMock, times(1)).save(Mockito.any(LampReparation.class));
		verify(lampDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampReparationException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenDescriptionIsNull_thenReturnThrowLampReparationException() {
		when(lampReparationDaoMock.save(Mockito.any(LampReparation.class))).thenThrow(DataIntegrityViolationException.class);
		when(lampDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lamp));
		
		lampReparation.setDescription(null);
		
		LampReparationException result = assertThrows(LampReparationException.class, () -> testedObject.create(lampReparation));
		
		verify(lampReparationDaoMock, times(1)).save(Mockito.any(LampReparation.class));
		verify(lampDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampReparationException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		LampReparation lampReparation2 = LampReparation.builder()
				.id(id2)
				.build();
		
		when(lampReparationDaoMock.findById(id)).thenReturn(Optional.ofNullable(lampReparation));
		
		LampReparation result = testedObject.update(id, lampReparation2);
		
		assertThat(result.getId()).isEqualTo(id);
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(lampReparationDaoMock, times(1)).deleteById(id);
	}
	
	@Test
	public void testAddComment() throws Exception {
		String commentaire = "commentaire";
		
		when(lampReparationDaoMock.findById(id)).thenReturn(Optional.ofNullable(lampReparation));
		
		LampReparation result = testedObject.addComment(id, commentaire);

		verify(lampReparationDaoMock, times(1)).findById(id);
		assertThat(result.getComments()).hasSize(1);
		assertThat(result.getComments().get(0)).isEqualTo(commentaire);
	}
	
	@Test
	public void testAddComment_whenLampReparationNotFound_thenThrowLampReparationException() throws Exception {
		String commentaire = "commentaire";
		
		when(lampReparationDaoMock.findById(id)).thenReturn(Optional.empty());
		
		LampReparationException result = assertThrows(LampReparationException.class, () -> testedObject.addComment(id, commentaire));

		verify(lampReparationDaoMock, times(1)).findById(id);
		assertThat(result.getMessage()).isEqualTo(LampReparationException.ID_NOT_VALID);
	}
	
	@Test
	public void testFinish() throws Exception {
		int duration = 60;
		
		when(lampReparationDaoMock.findById(id)).thenReturn(Optional.ofNullable(lampReparation));
		
		LampReparation result = testedObject.finish(id, duration);

		verify(lampReparationDaoMock, times(1)).findById(id);
		assertThat(result.getDuration()).isEqualTo(duration);
	}
	
	@Test
	public void testFinish_whenLampReparationNotFound_thenThrowLampReparationException() throws Exception {
		int duration = 60;
		
		when(lampReparationDaoMock.findById(id)).thenReturn(Optional.empty());
		
		LampReparationException result = assertThrows(LampReparationException.class, () -> testedObject.finish(id, duration));

		verify(lampReparationDaoMock, times(1)).findById(id);
		assertThat(result.getMessage()).isEqualTo(LampReparationException.ID_NOT_VALID);
	}
	
}
