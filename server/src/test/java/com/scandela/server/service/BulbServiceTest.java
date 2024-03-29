package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.never;
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

import com.scandela.server.dao.BulbDao;
import com.scandela.server.entity.Bulb;
import com.scandela.server.exception.BulbException;
import com.scandela.server.service.implementation.BulbService;

@RunWith(MockitoJUnitRunner.class)
public class BulbServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private BulbService testedObject;
	
	@Mock
	private BulbDao bulbDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final Long intensity = 17L;
	private final Short consommation = 3;
	private final String reference = "ref";
	private final Bulb bulb = Bulb.builder()
			.id(id)
			.intensity(intensity)
			.consommation(consommation)
			.reference(reference)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(bulbDaoMock.findAll()).thenReturn(Arrays.asList(bulb));
		
		List<Bulb> result = testedObject.getAll();
		
		verify(bulbDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Bulb resultedBulb = result.get(0);
		assertThat(resultedBulb.getId()).isEqualTo(bulb.getId());
		assertThat(resultedBulb.getIntensity()).isEqualTo(bulb.getIntensity());
		assertThat(resultedBulb.getConsommation()).isEqualTo(bulb.getConsommation());
		assertThat(resultedBulb.getReference()).isEqualTo(bulb.getReference());
	}
	
	@Test
	public void testGetAll_whenManyBulbs_thenReturnManyBulbs() {
		Bulb bulb2 = Bulb.builder()
				.id(UUID.randomUUID())
				.intensity(intensity)
				.consommation(consommation)
				.reference(reference)
				.build();
		
		when(bulbDaoMock.findAll()).thenReturn(Arrays.asList(bulb, bulb2));
		
		List<Bulb> result = testedObject.getAll();
		
		verify(bulbDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoBulb_thenReturnEmptyList() {
		when(bulbDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Bulb> result = testedObject.getAll();

		verify(bulbDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}
	
	@Test
	public void testGetAll_withName() {
		when(bulbDaoMock.findByReference(bulb.getReference())).thenReturn(Arrays.asList(bulb));

		List<Bulb> result = testedObject.getAll(bulb.getReference());

		verify(bulbDaoMock, never()).findAll();
		verify(bulbDaoMock, times(1)).findByReference(bulb.getReference());
		assertThat(result).isNotEmpty();
		assertThat(result.get(0).getId()).isEqualTo(bulb.getId());
	}

	@Test
	public void testGetAll_withName_whenNameIsNull_thenReturnAllLamps() {
		Bulb bulb2 = Bulb.builder()
				.id(UUID.randomUUID())
				.intensity(intensity)
				.consommation(consommation)
				.reference(reference)
				.build();

		when(bulbDaoMock.findAll()).thenReturn(Arrays.asList(bulb, bulb2));

		String arg = null;
		List<Bulb> result = testedObject.getAll(arg);

		verify(bulbDaoMock, times(1)).findAll();
		verify(bulbDaoMock, never()).findByReference(Mockito.anyString());
		assertThat(result).hasSize(2);
	}

	@Test
	public void testGetAll_withName_whenNameIsBlank_thenReturnAllLamps() {
		Bulb bulb2 = Bulb.builder()
				.id(UUID.randomUUID())
				.intensity(intensity)
				.consommation(consommation)
				.reference(reference)
				.build();

		when(bulbDaoMock.findAll()).thenReturn(Arrays.asList(bulb, bulb2));

		List<Bulb> result = testedObject.getAll("      ");

		verify(bulbDaoMock, times(1)).findAll();
		verify(bulbDaoMock, never()).findByReference(Mockito.anyString());
		assertThat(result).hasSize(2);
	}

	@Test
	public void testGet() {
		when(bulbDaoMock.findById(id)).thenReturn(Optional.of(bulb));
		
		Bulb result = testedObject.get(id);
		
		verify(bulbDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(bulb.getId());
		assertThat(result.getIntensity()).isEqualTo(bulb.getIntensity());
		assertThat(result.getConsommation()).isEqualTo(bulb.getConsommation());
		assertThat(result.getReference()).isEqualTo(bulb.getReference());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(bulbDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Bulb result = testedObject.get(id);

		verify(bulbDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws BulbException {
		when(bulbDaoMock.save(Mockito.any(Bulb.class))).thenReturn(bulb);
		
		Bulb result = testedObject.create(bulb);

		verify(bulbDaoMock, times(1)).save(Mockito.any(Bulb.class));
		assertThat(result.getId()).isEqualTo(bulb.getId());
		assertThat(result.getIntensity()).isEqualTo(bulb.getIntensity());
		assertThat(result.getConsommation()).isEqualTo(bulb.getConsommation());
		assertThat(result.getReference()).isEqualTo(bulb.getReference());
	}
	
	@Test
	public void testCreate_whenIntensityIsNull_thenReturnThrowBulbException() {
		bulb.setIntensity(null);

		when(bulbDaoMock.save(Mockito.any(Bulb.class))).thenThrow(DataIntegrityViolationException.class);
		
		BulbException result = assertThrows(BulbException.class, () -> testedObject.create(bulb));

		verify(bulbDaoMock, times(1)).save(Mockito.any(Bulb.class));
		assertThat(result.getMessage()).isEqualTo(BulbException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenConsommationIsNull_thenReturnThrowBulbException() {
		bulb.setConsommation(null);

		when(bulbDaoMock.save(Mockito.any(Bulb.class))).thenThrow(DataIntegrityViolationException.class);
		
		BulbException result = assertThrows(BulbException.class, () -> testedObject.create(bulb));

		verify(bulbDaoMock, times(1)).save(Mockito.any(Bulb.class));
		assertThat(result.getMessage()).isEqualTo(BulbException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenReferenceIsNull_thenReturnThrowBulbException() {
		bulb.setReference(null);

		when(bulbDaoMock.save(Mockito.any(Bulb.class))).thenThrow(DataIntegrityViolationException.class);
		
		BulbException result = assertThrows(BulbException.class, () -> testedObject.create(bulb));

		verify(bulbDaoMock, times(1)).save(Mockito.any(Bulb.class));
		assertThat(result.getMessage()).isEqualTo(BulbException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		Long intensity2 = 1188L;
		Short consommation2 = 9;
		String reference2 = "ref2";
		Bulb bulb2 = Bulb.builder()
				.id(id2)
				.intensity(intensity2)
				.consommation(consommation2)
				.reference(reference2)
				.build();
		
		when(bulbDaoMock.findById(id)).thenReturn(Optional.ofNullable(bulb));
		
		Bulb result = testedObject.update(id, bulb2);
		
		assertThat(result.getId()).isEqualTo(id);
		assertThat(result.getIntensity()).isEqualTo(bulb2.getIntensity());
		assertThat(result.getConsommation()).isEqualTo(bulb2.getConsommation());
		assertThat(result.getReference()).isEqualTo(bulb2.getReference());
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(bulbDaoMock, times(1)).deleteById(id);
	}
	
}
