package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.scandela.server.dao.DecisionDao;
import com.scandela.server.dao.DecisionTypeDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampDecisionDao;
import com.scandela.server.entity.Bulb;
import com.scandela.server.entity.Decision;
import com.scandela.server.entity.DecisionType;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampDecision;
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
	private LampDao lampDaoMock;
	
	@Mock
	private LampDecisionDao lampDecisionDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String description = "desc";
	private final String location = "loca";
	private final String solution = "soluce";
	private final DecisionType decisionType = DecisionType.builder().id(id).build();
	private final Decision decision = Decision.builder()
			.id(id)
			.type(decisionType)
			.location(location)
			.description(description)
			.solution(solution)
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
		assertThat(resultedDecision.getLocation()).isEqualTo(decision.getLocation());
		assertThat(resultedDecision.getDescription()).isEqualTo(decision.getDescription());
		assertThat(resultedDecision.getSolution()).isEqualTo(decision.getSolution());
	}
	
	@Test
	public void testGetAll_whenManyDecisions_thenReturnManyDecisions() {
		Decision decision2 = Decision.builder()
				.id(UUID.randomUUID())
				.type(decisionType)
				.location(location)
				.description(description)
				.solution(solution)
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
	public void testGetAllByDecisionTypes() {
		when(decisionDaoMock.findByTypeIn(Arrays.asList(decisionType))).thenReturn(Arrays.asList(decision));
		
		List<Decision> result = testedObject.getAllByDecisionTypes(Arrays.asList(decisionType));
		
		verify(decisionDaoMock, times(1)).findByTypeIn(Mockito.anyList());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType().getId()).isEqualTo(decisionType.getId());
	}
	
	@Test
	public void testGetAllByDecisionTypes_whenDecisionTypesIsNull_thenReturnEmpty() {
		List<Decision> result = testedObject.getAllByDecisionTypes(null);
		
		verify(decisionDaoMock, never()).findByTypeIn(Mockito.anyList());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testGetAllByDecisionTypes_whenDecisionTypesIsEmpty_thenReturnEmpty() {
		when(decisionDaoMock.findByTypeIn(new ArrayList<>())).thenReturn(new ArrayList<>());
		
		List<Decision> result = testedObject.getAllByDecisionTypes(new ArrayList<>());
		
		verify(decisionDaoMock, times(1)).findByTypeIn(Mockito.anyList());
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(decisionDaoMock.findById(id)).thenReturn(Optional.of(decision));
		
		Decision result = testedObject.get(id);
		
		verify(decisionDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(decision.getId());
		assertThat(result.getType()).isEqualTo(decision.getType());
		assertThat(result.getLocation()).isEqualTo(decision.getLocation());
		assertThat(result.getDescription()).isEqualTo(decision.getDescription());
		assertThat(result.getSolution()).isEqualTo(decision.getSolution());
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
		when(decisionTypeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(decisionType));
		
		Decision result = testedObject.create(decision);

		verify(decisionDaoMock, times(1)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(decision.getId());
		assertThat(result.getType()).isEqualTo(decision.getType());
		assertThat(result.getLocation()).isEqualTo(decision.getLocation());
		assertThat(result.getDescription()).isEqualTo(decision.getDescription());
		assertThat(result.getSolution()).isEqualTo(decision.getSolution());
	}
	
	@Test
	public void testCreate_whenTypeIsNull_thenReturnThrowDecisionException() {
		decision.setType(null);
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));
		
		verify(decisionDaoMock, times(0)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenTypeNotFound_thenThrowDecisionException() throws DecisionException {
		when(decisionTypeDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));

		verify(decisionDaoMock, times(0)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
	@Test
	public void testCreate_whenDescriptionIsNull_thenReturnThrowDecisionException() {
		decision.setDescription(null);

		when(decisionDaoMock.save(Mockito.any(Decision.class))).thenThrow(DataIntegrityViolationException.class);
		when(decisionTypeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(decisionType));
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));

		verify(decisionDaoMock, times(1)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLocationIsNull_thenReturnThrowDecisionException() {
		decision.setLocation(null);

		when(decisionDaoMock.save(Mockito.any(Decision.class))).thenThrow(DataIntegrityViolationException.class);
		when(decisionTypeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(decisionType));
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));

		verify(decisionDaoMock, times(1)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenSolutionIsNull_thenReturnThrowDecisionException() {
		decision.setSolution(null);

		when(decisionDaoMock.save(Mockito.any(Decision.class))).thenThrow(DataIntegrityViolationException.class);
		when(decisionTypeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(decisionType));
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.create(decision));

		verify(decisionDaoMock, times(1)).save(Mockito.any(Decision.class));
		verify(decisionTypeDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		String description2 = "desc2";
		String solution2 = "soluce2";
		String location2 = "location2";
		Decision decision2 = Decision.builder()
				.id(id2)
				.location(location2)
				.description(description2)
				.solution(solution2)
				.build();
		
		when(decisionDaoMock.findById(id)).thenReturn(Optional.ofNullable(decision));
		
		Decision result = testedObject.update(id, decision2);
		
		assertThat(result.getId()).isEqualTo(id);
		assertThat(result.getDescription()).isEqualTo(decision2.getDescription());
		assertThat(result.getLocation()).isEqualTo(decision2.getLocation());
		assertThat(result.getSolution()).isEqualTo(decision2.getSolution());
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(decisionDaoMock, times(1)).deleteById(id);
	}
	
	@Test
	public void testAlgoChangementBulb() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Changement bulb")
				.build();
		Lamp lamp = Lamp.builder()
				.address("AAA")
				.lampType("SHDE")
				.bulb(Bulb.builder().estimatedLifetime(730).build())
				.bulbLifetime(365)
				.build();
		
		when(decisionTypeDaoMock.findByTitleContains("Changement")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findByLampTypeIsNot(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findLampsWithBulbLifetimeGreaterThanOrEqualToEstimated(Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		
		List<Decision> result = testedObject.algoChangementBulb();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Changement");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findByLampTypeIsNot(Mockito.any(), Mockito.any());
		verify(lampDaoMock, times(1)).findLampsWithBulbLifetimeGreaterThanOrEqualToEstimated(Mockito.any());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(2);
		assertThat(result.get(0).getDescription()).contains("Ampoule LED moins consommatrice.");
		assertThat(result.get(0).getSolution()).contains("Changer l'ampoule \"");
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
		assertThat(result.get(1).getDescription()).contains("Durée de vie de l'ampoule estimée atteinte.");
		assertThat(result.get(1).getSolution()).contains("Remplacer l'ampoule \"");
		assertThat(result.get(1).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoChangementBulb_whenHasAnotherDecisionType_thenReturnDecision() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Changement bulb")
				.build();
		Lamp lamp = Lamp.builder()
				.address("AAA")
				.lampType("SHDE")
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(DecisionType.builder().title("aaa").build()).build()).build()))
				.bulb(Bulb.builder().estimatedLifetime(730).build())
				.bulbLifetime(365)
				.build();
		
		when(decisionTypeDaoMock.findByTitleContains("Changement")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(51l);
		when(lampDaoMock.findByLampTypeIsNot(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findLampsWithBulbLifetimeGreaterThanOrEqualToEstimated(Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		
		List<Decision> result = testedObject.algoChangementBulb();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Changement");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findByLampTypeIsNot(Mockito.any(), Mockito.any());
		verify(lampDaoMock, times(1)).findLampsWithBulbLifetimeGreaterThanOrEqualToEstimated(Mockito.any());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(2);
		assertThat(result.get(0).getDescription()).contains("Ampoule LED moins consommatrice.");
		assertThat(result.get(0).getSolution()).contains("Changer l'ampoule \"");
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
		assertThat(result.get(1).getDescription()).contains("Durée de vie de l'ampoule estimée atteinte.");
		assertThat(result.get(1).getSolution()).contains("Remplacer l'ampoule \"");
		assertThat(result.get(1).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoChangementBulb_whenAlreadyHasThisDecisionType_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Changement bulb")
				.build();
		Lamp lamp = Lamp.builder()
				.address("AAA")
				.lampType("SHDE")
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(decisionType).build()).build()))
				.bulb(Bulb.builder().estimatedLifetime(730).build())
				.bulbLifetime(365)
				.build();
		
		when(decisionTypeDaoMock.findByTitleContains("Changement")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findByLampTypeIsNot(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findLampsWithBulbLifetimeGreaterThanOrEqualToEstimated(Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		
		List<Decision> result = testedObject.algoChangementBulb();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Changement");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findByLampTypeIsNot(Mockito.any(), Mockito.any());
		verify(lampDaoMock, times(1)).findLampsWithBulbLifetimeGreaterThanOrEqualToEstimated(Mockito.any());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoChangementBulb_whenDecisionTypeNotFound_thenThrowDecisionException() {
		when(decisionTypeDaoMock.findByTitleContains("Changement")).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.algoChangementBulb());

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Changement");
		verify(lampDaoMock, never()).count();
		verify(lampDaoMock, never()).findByLampTypeIsNot(Mockito.any(), Mockito.any());
		verify(decisionDaoMock, never()).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, never()).saveAll(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
	@Test
	public void testAlgoReductionConsoHoraire() throws Exception {
		DecisionType decisionTypeAllumer = DecisionType.builder()
				.title("Allumer lampadaire")
				.build();
		DecisionType decisionTypeEteindre = DecisionType.builder()
				.title("Éteindre lampadaire")
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Allumer lampadaire")).thenReturn(Optional.of(decisionTypeAllumer));
		when(decisionTypeDaoMock.findByTitleContains("Éteindre lampadaire")).thenReturn(Optional.of(decisionTypeEteindre));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findByLightOn2IsNullOrLightOn2After(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp1)));
		when(lampDaoMock.findByLightOffIsNullOrLightOffBefore(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp2)));
		
		List<Decision> result = testedObject.algoReductionConsoHoraire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Allumer lampadaire");
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Éteindre lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findByLightOn2IsNullOrLightOn2After(Mockito.any(), Mockito.any());
		verify(lampDaoMock, times(1)).findByLightOffIsNullOrLightOffBefore(Mockito.any(), Mockito.any());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(2);
		assertThat(result.get(0).getType()).isEqualTo(decisionTypeAllumer);
		assertThat(result.get(0).getDescription()).contains("Coucher du soleil à ");
		assertThat(result.get(0).getSolution()).contains(lamp1.getName());
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp1);
		assertThat(result.get(1).getType()).isEqualTo(decisionTypeEteindre);
		assertThat(result.get(1).getDescription()).contains("Lever du soleil à ");
		assertThat(result.get(1).getSolution()).contains(lamp2.getName());
		assertThat(result.get(1).getLampDecision().getLamp()).isEqualTo(lamp2);
	}
	
	@Test
	public void testAlgoReductionConsoHoraire_whenHasAnotherDecisionType_thenReturnDecision() throws Exception {
		DecisionType decisionTypeAllumer = DecisionType.builder()
				.title("Allumer lampadaire")
				.build();
		DecisionType decisionTypeEteindre = DecisionType.builder()
				.title("Éteindre lampadaire")
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(DecisionType.builder().title("aaa").build()).build()).build()))
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(DecisionType.builder().title("aaa").build()).build()).build()))
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Allumer lampadaire")).thenReturn(Optional.of(decisionTypeAllumer));
		when(decisionTypeDaoMock.findByTitleContains("Éteindre lampadaire")).thenReturn(Optional.of(decisionTypeEteindre));
		when(lampDaoMock.count()).thenReturn(51l);
		when(lampDaoMock.findByLightOn2IsNullOrLightOn2After(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp1)));
		when(lampDaoMock.findByLightOffIsNullOrLightOffBefore(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp2)));
		
		List<Decision> result = testedObject.algoReductionConsoHoraire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Allumer lampadaire");
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Éteindre lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findByLightOn2IsNullOrLightOn2After(Mockito.any(), Mockito.any());
		verify(lampDaoMock, times(1)).findByLightOffIsNullOrLightOffBefore(Mockito.any(), Mockito.any());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(2);
		assertThat(result.get(0).getType()).isEqualTo(decisionTypeAllumer);
		assertThat(result.get(0).getDescription()).contains("Coucher du soleil à ");
		assertThat(result.get(0).getSolution()).contains(lamp1.getName());
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp1);
		assertThat(result.get(1).getType()).isEqualTo(decisionTypeEteindre);
		assertThat(result.get(1).getDescription()).contains("Lever du soleil à ");
		assertThat(result.get(1).getSolution()).contains(lamp2.getName());
		assertThat(result.get(1).getLampDecision().getLamp()).isEqualTo(lamp2);
	}
	
	@Test
	public void testAlgoReductionConsoHoraire_whenAlreadyHasThisDecisionType_thenReturnEmpty() throws Exception {
		DecisionType decisionTypeAllumer = DecisionType.builder()
				.title("Allumer lampadaire")
				.build();
		DecisionType decisionTypeEteindre = DecisionType.builder()
				.title("Éteindre lampadaire")
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(decisionTypeAllumer).build()).build()))
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(decisionTypeEteindre).build()).build()))
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Allumer lampadaire")).thenReturn(Optional.of(decisionTypeAllumer));
		when(decisionTypeDaoMock.findByTitleContains("Éteindre lampadaire")).thenReturn(Optional.of(decisionTypeEteindre));
		when(lampDaoMock.count()).thenReturn(5l);
		when(lampDaoMock.findByLightOn2IsNullOrLightOn2After(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp1)));
		when(lampDaoMock.findByLightOffIsNullOrLightOffBefore(Mockito.any(), Mockito.any())).thenReturn(new PageImpl<>(Arrays.asList(lamp2)));
		
		List<Decision> result = testedObject.algoReductionConsoHoraire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Allumer lampadaire");
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Éteindre lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findByLightOn2IsNullOrLightOn2After(Mockito.any(), Mockito.any());
		verify(lampDaoMock, times(1)).findByLightOffIsNullOrLightOffBefore(Mockito.any(), Mockito.any());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoReductionConsoHoraire_whenDecisionTypeAllumerNotFound_thenThrowDecisionException() {
		DecisionType decisionTypeEteindre = DecisionType.builder()
				.title("Éteindre lampadaire")
				.build();
		
		when(decisionTypeDaoMock.findByTitleContains("Allumer lampadaire")).thenReturn(Optional.empty());
		when(decisionTypeDaoMock.findByTitleContains("Éteindre lampadaire")).thenReturn(Optional.of(decisionTypeEteindre));
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.algoReductionConsoHoraire());

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Allumer lampadaire");
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Éteindre lampadaire");
		verify(lampDaoMock, never()).count();
		verify(lampDaoMock, never()).findByLightOn2IsNullOrLightOn2After(Mockito.any(), Mockito.any());
		verify(lampDaoMock, never()).findByLightOffIsNullOrLightOffBefore(Mockito.any(), Mockito.any());
		verify(decisionDaoMock, never()).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, never()).saveAll(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
	@Test
	public void testAlgoReductionConsoHoraire_whenDecisionTypeEteindreNotFound_thenThrowDecisionException() {
		DecisionType decisionTypeAllumer = DecisionType.builder()
				.title("Allumer lampadaire")
				.build();
		
		when(decisionTypeDaoMock.findByTitleContains("Allumer lampadaire")).thenReturn(Optional.of(decisionTypeAllumer));
		when(decisionTypeDaoMock.findByTitleContains("Éteindre lampadaire")).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.algoReductionConsoHoraire());

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Allumer lampadaire");
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Éteindre lampadaire");
		verify(lampDaoMock, never()).count();
		verify(lampDaoMock, never()).findByLightOn2IsNullOrLightOn2After(Mockito.any(), Mockito.any());
		verify(lampDaoMock, never()).findByLightOffIsNullOrLightOffBefore(Mockito.any(), Mockito.any());
		verify(decisionDaoMock, never()).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, never()).saveAll(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
	@Test
	public void testAlgoRetirerLampadaire() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Retirer lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Retirer lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1, lamp2));
		
		List<Decision> result = testedObject.algoRetirerLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Retirer lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType()).isEqualTo(decisionType);
		assertThat(result.get(0).getDescription()).contains("La distance entre les lampadaires n'est pas optimale.");
		assertThat(result.get(0).getSolution()).contains(lamp.getName());
		assertThat(result.get(0).getSolution()).contains(lamp1.getName());
		assertThat(result.get(0).getSolution()).contains(lamp2.getName());
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoRetirerLampadaire_whenHasAnotherDecisionType_thenReturnDecision() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Retirer lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(DecisionType.builder().title("aaa").build()).build()).build()))
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Retirer lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(51l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1, lamp2));
		
		List<Decision> result = testedObject.algoRetirerLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Retirer lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType()).isEqualTo(decisionType);
		assertThat(result.get(0).getDescription()).contains("La distance entre les lampadaires n'est pas optimale.");
		assertThat(result.get(0).getSolution()).contains(lamp.getName());
		assertThat(result.get(0).getSolution()).contains(lamp1.getName());
		assertThat(result.get(0).getSolution()).contains(lamp2.getName());
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoRetirerLampadaire_whenResultsSizeLessThanTwo_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Retirer lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Retirer lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1));
		
		List<Decision> result = testedObject.algoRetirerLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Retirer lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoRetirerLampadaire_whenAlreadyHasThisDecisionType_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Retirer lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(decisionType).build()).build()))
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Retirer lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1, lamp2));
		
		List<Decision> result = testedObject.algoRetirerLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Retirer lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoRetirerLampadaire_whenHeightIsNull_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Retirer lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.latitude(1.1d)
				.longitude(1.1d)
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Retirer lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		
		List<Decision> result = testedObject.algoRetirerLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Retirer lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, never()).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoRetirerLampadaire_whenDecisionTypeNotFound_thenThrowDecisionException() throws Exception {
		when(decisionTypeDaoMock.findByTitleContains("Retirer lampadaire")).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.algoRetirerLampadaire());
		
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Retirer lampadaire");
		verify(lampDaoMock, never()).count();
		verify(lampDaoMock, never()).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, never()).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, never()).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, never()).saveAll(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
	@Test
	public void testAlgoAjouterLampadaire() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Ajouter lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Ajouter lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1));
		
		List<Decision> result = testedObject.algoAjouterLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Ajouter lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType()).isEqualTo(decisionType);
		assertThat(result.get(0).getDescription()).contains("La distance entre 2 lampadaire n'est pas respectée.");
		assertThat(result.get(0).getSolution()).contains("LatMin");
		assertThat(result.get(0).getSolution()).contains("LatMax");
		assertThat(result.get(0).getSolution()).contains("LongMin");
		assertThat(result.get(0).getSolution()).contains("LongMax");
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoAjouterLampadaire_whenHasAnotherDecisionType_thenReturnDecision() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Ajouter lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(DecisionType.builder().title("aaa").build()).build()).build()))
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Ajouter lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(51l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1));
		
		List<Decision> result = testedObject.algoAjouterLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Ajouter lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType()).isEqualTo(decisionType);
		assertThat(result.get(0).getDescription()).contains("La distance entre 2 lampadaire n'est pas respectée.");
		assertThat(result.get(0).getSolution()).contains("LatMin");
		assertThat(result.get(0).getSolution()).contains("LatMax");
		assertThat(result.get(0).getSolution()).contains("LongMin");
		assertThat(result.get(0).getSolution()).contains("LongMax");
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoAjouterLampadaire_whenResultsSizeIsMoreThanOne_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Ajouter lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Ajouter lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1, lamp2));
		
		List<Decision> result = testedObject.algoAjouterLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Ajouter lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoAjouterLampadaire_whenAlreadyHasThisDecisionType_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Ajouter lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(decisionType).build()).build()))
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Ajouter lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1));
		
		List<Decision> result = testedObject.algoAjouterLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Ajouter lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoAjouterLampadaire_whenHeightIsNull_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Ajouter lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.latitude(1.1d)
				.longitude(1.1d)
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Ajouter lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		
		List<Decision> result = testedObject.algoAjouterLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Ajouter lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, never()).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoAjouterLampadaire_whenDecisionTypeNotFound_thenThrowDecisionException() throws Exception {
		when(decisionTypeDaoMock.findByTitleContains("Ajouter lampadaire")).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.algoAjouterLampadaire());
		
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Ajouter lampadaire");
		verify(lampDaoMock, never()).count();
		verify(lampDaoMock, never()).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, never()).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, never()).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, never()).saveAll(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
	@Test
	public void testAlgoReduireIntensiteLampadaire() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Réduire intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Réduire intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1));
		
		List<Decision> result = testedObject.algoReduireIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Réduire intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType()).isEqualTo(decisionType);
		assertThat(result.get(0).getDescription()).contains("Le lampdaire est entouré par");
		assertThat(result.get(0).getDescription()).contains(String.valueOf(lamp.getHeight() * 2.5));
		assertThat(result.get(0).getSolution()).contains("Réduire l'intensité du lampadaire de 5%");
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoReduireIntensiteLampadaire_whenHasAnotherDecisionType_thenReturnDecision() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Réduire intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(DecisionType.builder().title("aaa").build()).build()).build()))
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.build();
		Lamp lamp3 = Lamp.builder()
				.address("CCC")
				.name("NAME3")
				.build();
		Lamp lamp4 = Lamp.builder()
				.address("DDD")
				.name("NAME4")
				.build();
		Lamp lamp5 = Lamp.builder()
				.address("EEE")
				.name("NAME5")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Réduire intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(51l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1, lamp2, lamp3, lamp4, lamp5));
		
		List<Decision> result = testedObject.algoReduireIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Réduire intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType()).isEqualTo(decisionType);
		assertThat(result.get(0).getDescription()).contains("Le lampdaire est entouré par");
		assertThat(result.get(0).getDescription()).contains(String.valueOf(lamp.getHeight() * 2.5));
		assertThat(result.get(0).getSolution()).contains("Réduire l'intensité du lampadaire de 20%");
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoReduireIntensiteLampadaire_whenResultsSizeIsEmpty_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Réduire intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Réduire intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(new ArrayList<>());
		
		List<Decision> result = testedObject.algoReduireIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Réduire intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoReduireLampadaireLampadaire_whenAlreadyHasThisDecisionType_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Réduire intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(decisionType).build()).build()))
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Réduire intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1));
		
		List<Decision> result = testedObject.algoReduireIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Réduire intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoReduireIntensiteLampadaire_whenHeightIsNull_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Réduire intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.latitude(1.1d)
				.longitude(1.1d)
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Réduire intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		
		List<Decision> result = testedObject.algoReduireIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Réduire intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, never()).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoReduireIntensiteLampadaire_whenDecisionTypeNotFound_thenThrowDecisionException() throws Exception {
		when(decisionTypeDaoMock.findByTitleContains("Réduire intensité lampadaire")).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.algoReduireIntensiteLampadaire());
		
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Réduire intensité lampadaire");
		verify(lampDaoMock, never()).count();
		verify(lampDaoMock, never()).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, never()).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, never()).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, never()).saveAll(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
	@Test
	public void testAlgoAugmenterIntensiteLampadaire() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Augmenter intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Augmenter intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1));
		
		List<Decision> result = testedObject.algoAugmenterIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Augmenter intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType()).isEqualTo(decisionType);
		assertThat(result.get(0).getDescription()).contains("Le lampdaire est entouré par");
		assertThat(result.get(0).getDescription()).contains(String.valueOf(lamp.getHeight() * 3));
		assertThat(result.get(0).getSolution()).contains("Augmenter l'intensité du lampadaire de 15%");
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAlgoAugmenterIntensiteLampadaire_whenHasAnotherDecisionType_thenReturnDecision() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Augmenter intensité intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(DecisionType.builder().title("aaa").build()).build()).build()))
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.build();
		Lamp lamp3 = Lamp.builder()
				.address("CCC")
				.name("NAME3")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Augmenter intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(51l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1, lamp2, lamp3));
		
		List<Decision> result = testedObject.algoAugmenterIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Augmenter intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getType()).isEqualTo(decisionType);
		assertThat(result.get(0).getDescription()).contains("Le lampdaire est entouré par");
		assertThat(result.get(0).getDescription()).contains(String.valueOf(lamp.getHeight() * 3));
		assertThat(result.get(0).getSolution()).contains("Augmenter l'intensité du lampadaire de 5%");
		assertThat(result.get(0).getLampDecision().getLamp()).isEqualTo(lamp);
	}
	
	@Test
	public void testAugmenterReduireIntensiteLampadaire_whenResultsSizeIsMoreThanThree_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Augmenter intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();
		Lamp lamp2 = Lamp.builder()
				.address("BBB")
				.name("NAME2")
				.build();
		Lamp lamp3 = Lamp.builder()
				.address("CCC")
				.name("NAME3")
				.build();
		Lamp lamp4 = Lamp.builder()
				.address("DDD")
				.name("NAME4")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Augmenter intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1, lamp2, lamp3, lamp4));
		
		List<Decision> result = testedObject.algoAugmenterIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Augmenter intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoAugmenterLampadaireLampadaire_whenAlreadyHasThisDecisionType_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Augmenter intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.height(3d)
				.latitude(1.1d)
				.longitude(1.1d)
				.lampDecisions(Arrays.asList(LampDecision.builder().decision(Decision.builder().type(decisionType).build()).build()))
				.build();
		Lamp lamp1 = Lamp.builder()
				.address("AAA")
				.name("NAME1")
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Augmenter intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		when(lampDaoMock.findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble())).thenReturn(Arrays.asList(lamp1));
		
		List<Decision> result = testedObject.algoAugmenterIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Augmenter intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, times(1)).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoAugmenterIntensiteLampadaire_whenHeightIsNull_thenReturnEmpty() throws Exception {
		DecisionType decisionType = DecisionType.builder()
				.title("Augmenter intensité lampadaire")
				.build();
		Lamp lamp = Lamp.builder()
				.address("CCC")
				.name("NAME")
				.latitude(1.1d)
				.longitude(1.1d)
				.build();

		when(decisionTypeDaoMock.findByTitleContains("Augmenter intensité lampadaire")).thenReturn(Optional.of(decisionType));
		when(lampDaoMock.count()).thenReturn(1l);
		when(lampDaoMock.findAll(Mockito.any(PageRequest.class))).thenReturn(new PageImpl<>(Arrays.asList(lamp)));
		
		List<Decision> result = testedObject.algoAugmenterIntensiteLampadaire();

		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Augmenter intensité lampadaire");
		verify(lampDaoMock, times(1)).count();
		verify(lampDaoMock, times(1)).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, never()).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, times(1)).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, times(1)).saveAll(Mockito.any());
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testAlgoAugmenterIntensiteLampadaire_whenDecisionTypeNotFound_thenThrowDecisionException() throws Exception {
		when(decisionTypeDaoMock.findByTitleContains("Augmenter intensité lampadaire")).thenReturn(Optional.empty());
		
		DecisionException result = assertThrows(DecisionException.class, () -> testedObject.algoAugmenterIntensiteLampadaire());
		
		verify(decisionTypeDaoMock, times(1)).findByTitleContains("Augmenter intensité lampadaire");
		verify(lampDaoMock, never()).count();
		verify(lampDaoMock, never()).findAll(Mockito.any(PageRequest.class));
		verify(lampDaoMock, never()).findByLatitudeBetweenAndLongitudeBetween(Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble(), Mockito.anyDouble());
		verify(decisionDaoMock, never()).saveAll(Mockito.any());
		verify(lampDecisionDaoMock, never()).saveAll(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(DecisionException.DECISIONTYPE_LOADING);
	}
	
}
