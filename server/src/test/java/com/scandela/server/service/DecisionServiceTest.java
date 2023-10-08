package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.dao.DataIntegrityViolationException;

import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.entity.User;
import com.scandela.server.exception.DecisionException;
import com.scandela.server.service.implementation.DecisionService;

@RunWith(MockitoJUnitRunner.class)
public class DecisionServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private DecisionService testedObject;
	
	@Mock
	private DecisionDao decisionDaoMock;
	
	@Mock
	private DecisionTypeDao decisionTypeDaoMock;
	
	@Mock
	private UserDao userDaoMock;
	
	private final long id = 1;
	private final String description = "desc";
	private final boolean validate = true;
	private final LocalDate date = LocalDate.now();
	private final long cost = 17;
	private final List<Long> benefits = Arrays.asList(cost);
	private final DecisionType decisionType = DecisionType.builder().id(id).build();
	private final User user = User.builder().id(id).build();
	private final Decision decision = Decision.builder()
			.id(id)
			.type(decisionType)
			.user(user)
			.description(description)
			.validate(validate)
			.date(date)
			.cost(cost)
			.benefits(benefits)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(decisionDaoMock.findAll()).thenReturn(Arrays.asList(decision));
		
		List<Decision> result = testedObject.getAll();
		
		verify(decisionDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Decision resultedDecision = result.get(0);
		assertThat(resultedDecision.getId()).isEqualTo(decision.getId());
		assertThat(resultedDecision.getType()).isEqualTo(decision.getType());
		assertThat(resultedDecision.getUser()).isEqualTo(decision.getUser());
		assertThat(resultedDecision.getDescription()).isEqualTo(decision.getDescription());
		assertThat(resultedDecision.isValidate()).isEqualTo(decision.isValidate());
		assertThat(resultedDecision.getDate()).isEqualTo(decision.getDate());
		assertThat(resultedDecision.getCost()).isEqualTo(decision.getCost());
		assertThat(resultedDecision.getBenefits()).hasSize(decision.getBenefits().size());
	}
	
	@Test
	public void testGetAll_whenManyDecisions_thenReturnManyDecisions() {
		Decision decision2 = Decision.builder()
				.id(Long.valueOf(2))
				.type(decisionType)
				.user(user)
				.description(description)
				.validate(validate)
				.date(date)
				.cost(cost)
				.benefits(benefits)
				.build();
		
		when(decisionDaoMock.findAll()).thenReturn(Arrays.asList(decision, decision2));
		
		List<Decision> result = testedObject.getAll();
		
		verify(decisionDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoDecision_thenReturnEmptyList() {
		when(decisionDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Decision> result = testedObject.getAll();

		verify(decisionDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(decisionDaoMock.findById(id)).thenReturn(Optional.of(decision));
		
		Decision result = testedObject.get(id);
		
		verify(decisionDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(decision.getId());
		assertThat(result.getType()).isEqualTo(decision.getType());
		assertThat(result.getUser()).isEqualTo(decision.getUser());
		assertThat(result.getDescription()).isEqualTo(decision.getDescription());
		assertThat(result.isValidate()).isEqualTo(decision.isValidate());
		assertThat(result.getDate()).isEqualTo(decision.getDate());
		assertThat(result.getCost()).isEqualTo(decision.getCost());
		assertThat(result.getBenefits()).hasSize(decision.getBenefits().size());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(decisionDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Decision result = testedObject.get(id);

		verify(decisionDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws DecisionException {
		when(decisionDaoMock.save(Mockito.any(Decision.class))).thenReturn(decision);
		when(decisionTypeDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(decisionType));
		when(userDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(user));
		
		Decision result = testedObject.create(decision);

		verify(decisionDaoMock, times(1)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.anyLong());
		verify(userDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getId()).isEqualTo(decision.getId());
		assertThat(result.getType()).isEqualTo(decision.getType());
		assertThat(result.getUser()).isEqualTo(decision.getUser());
		assertThat(result.getDescription()).isEqualTo(decision.getDescription());
		assertThat(result.isValidate()).isEqualTo(decision.isValidate());
		assertThat(result.getDate()).isEqualTo(decision.getDate());
		assertThat(result.getCost()).isEqualTo(decision.getCost());
		assertThat(result.getBenefits()).hasSize(decision.getBenefits().size());
	}
	
	@Test
	public void testCreate_whenTypeIsNull_thenReturnThrowDecisionException() {
		decision.setType(null);
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));
		
		verify(decisionDaoMock, times(0)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(0)).findById(Mockito.anyLong());
		verify(userDaoMock, times(0)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(DecisionException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenTypeNotFound_thenThrowDecisionException() throws DecisionException {
		when(decisionTypeDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));

		verify(decisionDaoMock, times(0)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.anyLong());
		verify(userDaoMock, times(0)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
	@Test
	public void testCreate_whenUserIsNull_thenReturnThrowDecisionException() {
		decision.setUser(null);
		
		when(decisionTypeDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(decisionType));
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));
		
		verify(decisionDaoMock, times(0)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.anyLong());
		verify(userDaoMock, times(0)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(DecisionException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenUserNotFound_thenThrowDecisionException() throws DecisionException {
		when(decisionTypeDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(decisionType));
		when(userDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));

		verify(decisionDaoMock, times(0)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.anyLong());
		verify(userDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(DecisionException.USER_LOADING);
	}
	
	@Test
	public void testCreate_whenDescriptionIsNull_thenReturnThrowDecisionException() {
		decision.setDescription(null);

		when(decisionDaoMock.save(Mockito.any(Decision.class))).thenThrow(DataIntegrityViolationException.class);
		when(decisionTypeDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(decisionType));
		when(userDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(user));
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));

		verify(decisionDaoMock, times(1)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(DecisionException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenCostIsNull_thenReturnThrowDecisionException() {
		decision.setCost(null);

		when(decisionDaoMock.save(Mockito.any(Decision.class))).thenThrow(DataIntegrityViolationException.class);
		when(decisionTypeDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(decisionType));
		when(userDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(user));
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));

		verify(decisionDaoMock, times(1)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(DecisionException.INCOMPLETE_INFORMATIONS);
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(decisionDaoMock, times(1)).deleteById(id);
	}
	
}
