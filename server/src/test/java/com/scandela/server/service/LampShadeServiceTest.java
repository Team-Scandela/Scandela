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

import com.scandela.server.dao.LampShadeDao;
import com.scandela.server.entity.LampShade;
import com.scandela.server.exception.LampShadeException;
import com.scandela.server.service.implementation.LampShadeService;

@RunWith(MockitoJUnitRunner.class)
public class LampShadeServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private LampShadeService testedObject;
	
	@Mock
	private LampShadeDao lampShadeDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String reference = "ref";
	private final Double quality = 0.17;
	private final LampShade lampShade = LampShade.builder()
			.id(id)
			.reference(reference)
			.quality(quality)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(lampShadeDaoMock.findAll()).thenReturn(Arrays.asList(lampShade));
		
		List<LampShade> result = testedObject.getAll();
		
		verify(lampShadeDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		LampShade resultedHat = result.get(0);
		assertThat(resultedHat.getId()).isEqualTo(lampShade.getId());
		assertThat(resultedHat.getQuality()).isEqualTo(lampShade.getQuality());
		assertThat(resultedHat.getReference()).isEqualTo(lampShade.getReference());
	}
	
	@Test
	public void testGetAll_whenManyHats_thenReturnManyHats() {
		LampShade hat2 = LampShade.builder()
				.id(UUID.randomUUID())
				.reference(reference)
				.quality(quality)
				.build();
		
		when(lampShadeDaoMock.findAll()).thenReturn(Arrays.asList(lampShade, hat2));
		
		List<LampShade> result = testedObject.getAll();
		
		verify(lampShadeDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoHat_thenReturnEmptyList() {
		when(lampShadeDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<LampShade> result = testedObject.getAll();

		verify(lampShadeDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(lampShadeDaoMock.findById(id)).thenReturn(Optional.of(lampShade));
		
		LampShade result = testedObject.get(id);
		
		verify(lampShadeDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(lampShade.getId());
		assertThat(result.getReference()).isEqualTo(lampShade.getReference());
		assertThat(result.getQuality()).isEqualTo(lampShade.getQuality());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(lampShadeDaoMock.findById(id)).thenReturn(Optional.empty());
		
		LampShade result = testedObject.get(id);

		verify(lampShadeDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws LampShadeException {
		when(lampShadeDaoMock.save(Mockito.any(LampShade.class))).thenReturn(lampShade);
		
		LampShade result = testedObject.create(lampShade);

		verify(lampShadeDaoMock, times(1)).save(Mockito.any(LampShade.class));
		assertThat(result.getId()).isEqualTo(lampShade.getId());
		assertThat(result.getReference()).isEqualTo(lampShade.getReference());
		assertThat(result.getQuality()).isEqualTo(lampShade.getQuality());
	}
	
	@Test
	public void testCreate_whenReferenceIsNull_thenReturnThrowHatException() {
		lampShade.setReference(null);

		when(lampShadeDaoMock.save(Mockito.any(LampShade.class))).thenThrow(DataIntegrityViolationException.class);
		
		LampShadeException result = assertThrows(LampShadeException.class, () -> testedObject.create(lampShade));

		verify(lampShadeDaoMock, times(1)).save(Mockito.any(LampShade.class));
		assertThat(result.getMessage()).isEqualTo(LampShadeException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenQualityIsNull_thenReturnThrowHatException() {
		lampShade.setQuality(null);

		when(lampShadeDaoMock.save(Mockito.any(LampShade.class))).thenThrow(DataIntegrityViolationException.class);
		
		LampShadeException result = assertThrows(LampShadeException.class, () -> testedObject.create(lampShade));

		verify(lampShadeDaoMock, times(1)).save(Mockito.any(LampShade.class));
		assertThat(result.getMessage()).isEqualTo(LampShadeException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		String reference2 = "ref2";
		Double quality2 = 13131.17;
		LampShade lampShade2 = LampShade.builder()
				.id(id2)
				.reference(reference2)
				.quality(quality2)
				.build();
		
		
		when(lampShadeDaoMock.findById(id)).thenReturn(Optional.ofNullable(lampShade));
		
		LampShade result = testedObject.update(id, lampShade2);

		assertThat(result.getId()).isEqualTo(id);
		assertThat(result.getReference()).isEqualTo(lampShade2.getReference());
		assertThat(result.getQuality()).isEqualTo(lampShade2.getQuality());
	}

	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(lampShadeDaoMock, times(1)).deleteById(id);
	}
	
}
