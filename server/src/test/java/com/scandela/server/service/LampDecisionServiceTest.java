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

import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.LampDecisionDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.LampDecision;
import com.scandela.server.exception.LampDecisionException;
import com.scandela.server.service.implementation.LampDecisionService;

@RunWith(MockitoJUnitRunner.class)
public class LampDecisionServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private LampDecisionService testedObject;
	
	@Mock
	private LampDecisionDao lampDecisionDaoMock;
	
	@Mock
	private DecisionDao decisionDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final Decision decision = Decision.builder().id(id).build();
	private final LampDecision lampDecision = LampDecision.builder()
			.id(id)
			.decision(decision)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(lampDecisionDaoMock.findAll()).thenReturn(Arrays.asList(lampDecision));
		
		List<LampDecision> result = testedObject.getAll();
		
		verify(lampDecisionDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		LampDecision resultedLampDecision = result.get(0);
		assertThat(resultedLampDecision.getId()).isEqualTo(lampDecision.getId());
		assertThat(resultedLampDecision.getDecision()).isEqualTo(lampDecision.getDecision());
	}
	
	@Test
	public void testGetAll_whenManyLampDecisions_thenReturnManyLampDecisions() {
		LampDecision lampDecision2 = LampDecision.builder()
				.id(UUID.randomUUID())
				.decision(decision)
				.build();
		
		when(lampDecisionDaoMock.findAll()).thenReturn(Arrays.asList(lampDecision, lampDecision2));
		
		List<LampDecision> result = testedObject.getAll();
		
		verify(lampDecisionDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoLampDecision_thenReturnEmptyList() {
		when(lampDecisionDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<LampDecision> result = testedObject.getAll();

		verify(lampDecisionDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(lampDecisionDaoMock.findById(id)).thenReturn(Optional.of(lampDecision));
		
		LampDecision result = testedObject.get(id);
		
		verify(lampDecisionDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(lampDecision.getId());
		assertThat(result.getDecision()).isEqualTo(lampDecision.getDecision());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(lampDecisionDaoMock.findById(id)).thenReturn(Optional.empty());
		
		LampDecision result = testedObject.get(id);

		verify(lampDecisionDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws LampDecisionException {
		when(lampDecisionDaoMock.save(Mockito.any(LampDecision.class))).thenReturn(lampDecision);
		when(decisionDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(decision));
		
		LampDecision result = testedObject.create(lampDecision);

		verify(lampDecisionDaoMock, times(1)).save(Mockito.any(LampDecision.class));
		verify(decisionDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(lampDecision.getId());
		assertThat(result.getDecision()).isEqualTo(lampDecision.getDecision());
	}
	
	@Test
	public void testCreate_whenDecisionIsNull_thenReturnThrowLampDecisionException() {
		lampDecision.setDecision(null);
		
		LampDecisionException result = assertThrows(LampDecisionException.class, () -> testedObject.create(lampDecision));
		
		verify(lampDecisionDaoMock, times(0)).save(Mockito.any(LampDecision.class));
		verify(decisionDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampDecisionException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenDecisionNotFound_thenThrowLampDecisionException() throws LampDecisionException {
		when(decisionDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		LampDecisionException result = assertThrows(LampDecisionException.class, () -> testedObject.create(lampDecision));

		verify(lampDecisionDaoMock, times(0)).save(Mockito.any(LampDecision.class));
		verify(decisionDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(LampDecisionException.DECISION_LOADING);
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(lampDecisionDaoMock, times(1)).deleteById(id);
	}
	
}
