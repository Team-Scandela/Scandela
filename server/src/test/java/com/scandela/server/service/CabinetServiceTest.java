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

import com.scandela.server.dao.CabinetDao;
import com.scandela.server.entity.Cabinet;
import com.scandela.server.exception.CabinetException;
import com.scandela.server.service.implementation.CabinetService;

@RunWith(MockitoJUnitRunner.class)
public class CabinetServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private CabinetService testedObject;
	
	@Mock
	private CabinetDao cabinetDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String reference = "ref";
	private final Double latitude = 0.17;
	private final Double longitude = 0.71;
	private final Cabinet cabinet = Cabinet.builder()
			.id(id)
			.reference(reference)
			.latitude(latitude)
			.longitude(longitude)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(cabinetDaoMock.findAll()).thenReturn(Arrays.asList(cabinet));
		
		List<Cabinet> result = testedObject.getAll();
		
		verify(cabinetDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Cabinet resultedCabinet = result.get(0);
		assertThat(resultedCabinet.getId()).isEqualTo(cabinet.getId());
		assertThat(resultedCabinet.getReference()).isEqualTo(cabinet.getReference());
		assertThat(resultedCabinet.getLatitude()).isEqualTo(cabinet.getLatitude());
		assertThat(resultedCabinet.getLongitude()).isEqualTo(cabinet.getLongitude());
	}
	
	@Test
	public void testGetAll_whenManyCabinets_thenReturnManyCabinets() {
		Cabinet cabinet2 = Cabinet.builder()
				.id(UUID.randomUUID())
				.reference(reference)
				.latitude(latitude)
				.longitude(longitude)
				.build();
		
		when(cabinetDaoMock.findAll()).thenReturn(Arrays.asList(cabinet, cabinet2));
		
		List<Cabinet> result = testedObject.getAll();
		
		verify(cabinetDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoCabinet_thenReturnEmptyList() {
		when(cabinetDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Cabinet> result = testedObject.getAll();

		verify(cabinetDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(cabinetDaoMock.findById(id)).thenReturn(Optional.of(cabinet));
		
		Cabinet result = testedObject.get(id);
		
		verify(cabinetDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(cabinet.getId());
		assertThat(result.getReference()).isEqualTo(cabinet.getReference());
		assertThat(result.getLatitude()).isEqualTo(cabinet.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(cabinet.getLongitude());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(cabinetDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Cabinet result = testedObject.get(id);

		verify(cabinetDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws CabinetException {
		when(cabinetDaoMock.save(Mockito.any(Cabinet.class))).thenReturn(cabinet);
		
		Cabinet result = testedObject.create(cabinet);

		verify(cabinetDaoMock, times(1)).save(Mockito.any(Cabinet.class));
		assertThat(result.getId()).isEqualTo(cabinet.getId());
		assertThat(result.getReference()).isEqualTo(cabinet.getReference());
		assertThat(result.getLatitude()).isEqualTo(cabinet.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(cabinet.getLongitude());
	}
	
	@Test
	public void testCreate_whenReferenceIsNull_thenReturnThrowCabinetException() {
		cabinet.setReference(null);

		when(cabinetDaoMock.save(Mockito.any(Cabinet.class))).thenThrow(DataIntegrityViolationException.class);
		
		CabinetException result = assertThrows(CabinetException.class, () -> testedObject.create(cabinet));

		verify(cabinetDaoMock, times(1)).save(Mockito.any(Cabinet.class));
		assertThat(result.getMessage()).isEqualTo(CabinetException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLatitudeIsNull_thenReturnThrowCabinetException() {
		cabinet.setLatitude(null);

		when(cabinetDaoMock.save(Mockito.any(Cabinet.class))).thenThrow(DataIntegrityViolationException.class);
		
		CabinetException result = assertThrows(CabinetException.class, () -> testedObject.create(cabinet));

		verify(cabinetDaoMock, times(1)).save(Mockito.any(Cabinet.class));
		assertThat(result.getMessage()).isEqualTo(CabinetException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenLongitudeIsNull_thenReturnThrowCabinetException() {
		cabinet.setLongitude(null);

		when(cabinetDaoMock.save(Mockito.any(Cabinet.class))).thenThrow(DataIntegrityViolationException.class);
		
		CabinetException result = assertThrows(CabinetException.class, () -> testedObject.create(cabinet));

		verify(cabinetDaoMock, times(1)).save(Mockito.any(Cabinet.class));
		assertThat(result.getMessage()).isEqualTo(CabinetException.INCOMPLETE_INFORMATIONS);
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(cabinetDaoMock, times(1)).deleteById(id);
	}
	
}
