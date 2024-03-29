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

import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.exception.DecisionTypeException;
import com.scandela.server.service.implementation.DecisionTypeService;

@RunWith(MockitoJUnitRunner.class)
public class DecisionTypeServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private DecisionTypeService testedObject;
	
	@Mock
	private DecisionTypeDao decisionTypeDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String title = "Test";
	private final List<Decision> decisions = Arrays.asList(Decision.builder().id(id).build());
	private final DecisionType decisionType = DecisionType.builder()
			.id(id)
			.title(title)
			.moreInformations(Arrays.asList(title))
			.decisions(decisions)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(decisionTypeDaoMock.findAll()).thenReturn(Arrays.asList(decisionType));
		
		List<DecisionType> result = testedObject.getAll();
		
		verify(decisionTypeDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		DecisionType resultedDecisionType = result.get(0);
		assertThat(resultedDecisionType.getId()).isEqualTo(decisionType.getId());
		assertThat(resultedDecisionType.getTitle()).isEqualTo(decisionType.getTitle());
		assertThat(resultedDecisionType.getMoreInformations()).hasSize(decisionType.getMoreInformations().size());
		assertThat(resultedDecisionType.getDecisions()).hasSize(decisionType.getDecisions().size());
	}
	
	@Test
	public void testGetAll_whenManyDecisionTypes_thenReturnManyDecisionTypes() {
		DecisionType decisionType2 = DecisionType.builder()
				.id(UUID.randomUUID())
				.title(title)
				.build();
		
		when(decisionTypeDaoMock.findAll()).thenReturn(Arrays.asList(decisionType, decisionType2));
		
		List<DecisionType> result = testedObject.getAll();
		
		verify(decisionTypeDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoDecisionType_thenReturnEmptyList() {
		when(decisionTypeDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<DecisionType> result = testedObject.getAll();

		verify(decisionTypeDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(decisionTypeDaoMock.findById(id)).thenReturn(Optional.of(decisionType));
		
		DecisionType result = testedObject.get(id);
		
		verify(decisionTypeDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(decisionType.getId());
		assertThat(result.getTitle()).isEqualTo(decisionType.getTitle());
		assertThat(result.getMoreInformations()).hasSize(decisionType.getMoreInformations().size());
		assertThat(result.getDecisions()).hasSize(decisionType.getDecisions().size());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(decisionTypeDaoMock.findById(id)).thenReturn(Optional.empty());
		
		DecisionType result = testedObject.get(id);

		verify(decisionTypeDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws DecisionTypeException {
		when(decisionTypeDaoMock.save(Mockito.any(DecisionType.class))).thenReturn(decisionType);
		
		DecisionType result = testedObject.create(decisionType);

		verify(decisionTypeDaoMock, times(1)).save(Mockito.any(DecisionType.class));
		assertThat(result.getId()).isEqualTo(decisionType.getId());
		assertThat(result.getTitle()).isEqualTo(decisionType.getTitle());
		assertThat(result.getMoreInformations()).hasSize(decisionType.getMoreInformations().size());
		assertThat(result.getDecisions()).hasSize(decisionType.getDecisions().size());
	}
	
	@Test
	public void testCreate_whenNameIsNull_thenReturnThrowDecisionTypeException() {
		decisionType.setTitle(null);

		when(decisionTypeDaoMock.save(Mockito.any(DecisionType.class))).thenThrow(DataIntegrityViolationException.class);
		
		DecisionTypeException result = assertThrows(DecisionTypeException.class, () -> testedObject.create(decisionType));

		verify(decisionTypeDaoMock, times(1)).save(Mockito.any(DecisionType.class));
		assertThat(result.getMessage()).isEqualTo(DecisionTypeException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		String title2 = "Test2";
		DecisionType decisionType2 = DecisionType.builder()
				.id(id2)
				.title(title2)
				.moreInformations(Arrays.asList(title2))
				.build();
		
		when(decisionTypeDaoMock.findById(id)).thenReturn(Optional.ofNullable(decisionType));
		
		DecisionType result = testedObject.update(id, decisionType2);
		
		assertThat(result.getId()).isEqualTo(id);
		assertThat(result.getTitle()).isEqualTo(decisionType2.getTitle());
		assertThat(result.getMoreInformations()).isEqualTo(decisionType2.getMoreInformations());
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(decisionTypeDaoMock, times(1)).deleteById(id);
	}
	
}
