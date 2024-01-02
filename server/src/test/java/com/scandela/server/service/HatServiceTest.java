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

import com.scandela.server.dao.HatDao;
import com.scandela.server.entity.Hat;
import com.scandela.server.exception.HatException;
import com.scandela.server.service.implementation.HatService;

@RunWith(MockitoJUnitRunner.class)
public class HatServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private HatService testedObject;
	
	@Mock
	private HatDao hatDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String reference = "ref";
	private final Double quality = 0.17;
	private final Hat hat = Hat.builder()
			.id(id)
			.reference(reference)
			.quality(quality)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(hatDaoMock.findAll()).thenReturn(Arrays.asList(hat));
		
		List<Hat> result = testedObject.getAll();
		
		verify(hatDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Hat resultedHat = result.get(0);
		assertThat(resultedHat.getId()).isEqualTo(hat.getId());
		assertThat(resultedHat.getQuality()).isEqualTo(hat.getQuality());
		assertThat(resultedHat.getReference()).isEqualTo(hat.getReference());
	}
	
	@Test
	public void testGetAll_whenManyHats_thenReturnManyHats() {
		Hat hat2 = Hat.builder()
				.id(UUID.randomUUID())
				.reference(reference)
				.quality(quality)
				.build();
		
		when(hatDaoMock.findAll()).thenReturn(Arrays.asList(hat, hat2));
		
		List<Hat> result = testedObject.getAll();
		
		verify(hatDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoHat_thenReturnEmptyList() {
		when(hatDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Hat> result = testedObject.getAll();

		verify(hatDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(hatDaoMock.findById(id)).thenReturn(Optional.of(hat));
		
		Hat result = testedObject.get(id);
		
		verify(hatDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(hat.getId());
		assertThat(result.getReference()).isEqualTo(hat.getReference());
		assertThat(result.getQuality()).isEqualTo(hat.getQuality());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(hatDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Hat result = testedObject.get(id);

		verify(hatDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws HatException {
		when(hatDaoMock.save(Mockito.any(Hat.class))).thenReturn(hat);
		
		Hat result = testedObject.create(hat);

		verify(hatDaoMock, times(1)).save(Mockito.any(Hat.class));
		assertThat(result.getId()).isEqualTo(hat.getId());
		assertThat(result.getReference()).isEqualTo(hat.getReference());
		assertThat(result.getQuality()).isEqualTo(hat.getQuality());
	}
	
	@Test
	public void testCreate_whenReferenceIsNull_thenReturnThrowHatException() {
		hat.setReference(null);

		when(hatDaoMock.save(Mockito.any(Hat.class))).thenThrow(DataIntegrityViolationException.class);
		
		HatException result = assertThrows(HatException.class, () -> testedObject.create(hat));

		verify(hatDaoMock, times(1)).save(Mockito.any(Hat.class));
		assertThat(result.getMessage()).isEqualTo(HatException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenQualityIsNull_thenReturnThrowHatException() {
		hat.setQuality(null);

		when(hatDaoMock.save(Mockito.any(Hat.class))).thenThrow(DataIntegrityViolationException.class);
		
		HatException result = assertThrows(HatException.class, () -> testedObject.create(hat));

		verify(hatDaoMock, times(1)).save(Mockito.any(Hat.class));
		assertThat(result.getMessage()).isEqualTo(HatException.INCOMPLETE_INFORMATIONS);
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(hatDaoMock, times(1)).deleteById(id);
	}
	
}
