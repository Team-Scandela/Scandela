package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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

import com.scandela.server.dao.HoodDao;
import com.scandela.server.dao.StreetDao;
import com.scandela.server.entity.Hood;
import com.scandela.server.entity.Street;
import com.scandela.server.exception.StreetException;
import com.scandela.server.service.implementation.StreetService;

@RunWith(MockitoJUnitRunner.class)
public class StreetServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private StreetService testedObject;
	
	@Mock
	private StreetDao streetDaoMock;
	
	@Mock
	private HoodDao hoodDaoMock;
	
	private final long id = 1;
	private final List<String> address = Arrays.asList("a", "b");
	private final Hood hood = Hood.builder().id(id).build();
	private final Street street = Street.builder()
			.id(id)
			.hood(hood)
			.address(address)
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(streetDaoMock.findAll()).thenReturn(Arrays.asList(street));
		
		List<Street> result = testedObject.getAll();
		
		verify(streetDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		Street resultedStreet = result.get(0);
		assertThat(resultedStreet.getId()).isEqualTo(street.getId());
		assertThat(resultedStreet.getHood()).isEqualTo(street.getHood());
		assertThat(resultedStreet.getAddress()).hasSize(street.getAddress().size());
	}
	
	@Test
	public void testGetAll_whenManyStreets_thenReturnManyStreets() {
		Street street2 = Street.builder()
				.id(Long.valueOf(2))
				.hood(hood)
				.address(address)
				.build();
		
		when(streetDaoMock.findAll()).thenReturn(Arrays.asList(street, street2));
		
		List<Street> result = testedObject.getAll();
		
		verify(streetDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoStreet_thenReturnEmptyList() {
		when(streetDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<Street> result = testedObject.getAll();

		verify(streetDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(streetDaoMock.findById(id)).thenReturn(Optional.of(street));
		
		Street result = testedObject.get(id);
		
		verify(streetDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(street.getId());
		assertThat(result.getHood()).isEqualTo(street.getHood());
		assertThat(result.getAddress()).hasSize(street.getAddress().size());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(streetDaoMock.findById(id)).thenReturn(Optional.empty());
		
		Street result = testedObject.get(id);

		verify(streetDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws StreetException {
		when(streetDaoMock.save(Mockito.any(Street.class))).thenReturn(street);
		when(hoodDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(hood));
		
		Street result = testedObject.create(street);

		verify(streetDaoMock, times(1)).save(Mockito.any(Street.class));
		verify(hoodDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getId()).isEqualTo(street.getId());
		assertThat(result.getHood()).isEqualTo(street.getHood());
		assertThat(result.getAddress()).hasSize(street.getAddress().size());
	}
	
	@Test
	public void testCreate_whenHoodIsNull_thenReturnThrowStreetException() {
		street.setHood(null);
		
		StreetException result = assertThrows(StreetException.class, () -> testedObject.create(street));
		
		verify(streetDaoMock, times(0)).save(Mockito.any(Street.class));
		verify(hoodDaoMock, times(0)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(StreetException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenAddressIsNull_thenReturnThrowStreetException() {
		street.setAddress(null);

		when(streetDaoMock.save(Mockito.any(Street.class))).thenThrow(DataIntegrityViolationException.class);
		when(hoodDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.ofNullable(hood));
		
		StreetException result = assertThrows(StreetException.class, () -> testedObject.create(street));

		verify(streetDaoMock, times(1)).save(Mockito.any(Street.class));
		verify(hoodDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(StreetException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenHoodNotFound_thenThrowStreetException() throws StreetException {
		when(hoodDaoMock.findById(Mockito.anyLong())).thenReturn(Optional.empty());
		
		StreetException result = assertThrows(StreetException.class, () -> testedObject.create(street));

		verify(streetDaoMock, times(0)).save(Mockito.any(Street.class));
		verify(hoodDaoMock, times(1)).findById(Mockito.anyLong());
		assertThat(result.getMessage()).isEqualTo(StreetException.HOOD_LOADING);
	}

	@Test
	public void testDelete() {
		testedObject.delete(street);

		verify(streetDaoMock, times(1)).delete(street);
	}
	
}
