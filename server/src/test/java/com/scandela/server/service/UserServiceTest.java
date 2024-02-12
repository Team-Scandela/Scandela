package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
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

import com.scandela.server.dao.TownDao;
import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.Town;
import com.scandela.server.entity.User;
import com.scandela.server.exception.UserException;
import com.scandela.server.service.implementation.UserService;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private UserService testedObject;
	
	@Mock
	private UserDao userDaoMock;
	
	@Mock
	private TownDao townDaoMock;
	
	private final UUID id = UUID.randomUUID();
	private final String email = "test@test.test";
	private final String username = "tester";
	private final String password = "test";
	private final Integer rights = 1;
	private final Town town = Town.builder().id(id).build();
	private final User user = User.builder()
			.id(id)
			.town(town)
			.email(email)
			.username(username)
			.password(password)
			.rights(rights)
			.moreInformations(new ArrayList<>())
			.darkmode(true)
			.lastConnexion(LocalDateTime.now())
			.build();
	
	// Methods \\
		// Public \\
	@Test
	public void testGetAll() {
		when(userDaoMock.findAll()).thenReturn(Arrays.asList(user));
		
		List<User> result = testedObject.getAll();
		
		verify(userDaoMock, times(1)).findAll();
		assertThat(result).hasSize(1);
		User resultedUser = result.get(0);
		assertThat(resultedUser.getId()).isEqualTo(user.getId());
		assertThat(resultedUser.getTown()).isEqualTo(user.getTown());
		assertThat(resultedUser.getEmail()).isEqualTo(user.getEmail());
		assertThat(resultedUser.getUsername()).isEqualTo(user.getUsername());
		assertThat(resultedUser.getPassword()).isEqualTo(user.getPassword());
		assertThat(resultedUser.getRights()).isEqualTo(user.getRights());
		assertThat(resultedUser.getMoreInformations()).isEqualTo(user.getMoreInformations());
		assertThat(resultedUser.isDarkmode()).isEqualTo(user.isDarkmode());
		assertThat(resultedUser.getLastConnexion().toString()).isEqualTo(user.getLastConnexion().toString());
	}
	
	@Test
	public void testGetAll_whenManyUsers_thenReturnManyUsers() {
		Town town2 = Town.builder()
				.id(UUID.randomUUID())
				.name("Test2")
				.latitude(89.0913)
				.longitude(3.4543)
				.electricityPrice(32f)
				.indiceElectricity(0.45f)
				.indiceEcology(0.78f)
				.indiceQuality(0.17f)
				.build();
		
		User user2 = User.builder()
				.id(UUID.randomUUID())
				.town(town2)
				.email("test2@test2.test2")
				.username("tester2")
				.password("test2")
				.rights(2)
				.lastConnexion(LocalDateTime.now())
				.build();
		
		when(userDaoMock.findAll()).thenReturn(Arrays.asList(user, user2));
		
		List<User> result = testedObject.getAll();
		
		verify(userDaoMock, times(1)).findAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetAll_whenNoUser_thenReturnEmptyList() {
		when(userDaoMock.findAll()).thenReturn(Arrays.asList());
		
		List<User> result = testedObject.getAll();

		verify(userDaoMock, times(1)).findAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGet() {
		when(userDaoMock.findById(id)).thenReturn(Optional.of(user));
		
		User result = testedObject.get(id);
		
		verify(userDaoMock, times(1)).findById(id);
		assertThat(result.getId()).isEqualTo(user.getId());
		assertThat(result.getTown()).isEqualTo(user.getTown());
		assertThat(result.getEmail()).isEqualTo(user.getEmail());
		assertThat(result.getUsername()).isEqualTo(user.getUsername());
		assertThat(result.getPassword()).isEqualTo(user.getPassword());
		assertThat(result.getRights()).isEqualTo(user.getRights());
		assertThat(result.getMoreInformations()).isEqualTo(user.getMoreInformations());
		assertThat(result.isDarkmode()).isEqualTo(user.isDarkmode());
		assertThat(result.getLastConnexion().toString()).isEqualTo(user.getLastConnexion().toString());
	}
	
	@Test
	public void testGet_whenIdNonExistant_thenReturnNull() {
		when(userDaoMock.findById(id)).thenReturn(Optional.empty());
		
		User result = testedObject.get(id);

		verify(userDaoMock, times(1)).findById(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreate() throws UserException {
		when(userDaoMock.save(Mockito.any(User.class))).thenReturn(user);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		User result = testedObject.create(user);

		verify(userDaoMock, times(1)).save(Mockito.any(User.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(user.getId());
		assertThat(result.getTown()).isEqualTo(user.getTown());
		assertThat(result.getEmail()).isEqualTo(user.getEmail());
		assertThat(result.getUsername()).isEqualTo(user.getUsername());
		assertThat(result.getPassword()).isEqualTo(user.getPassword());
		assertThat(result.getRights()).isEqualTo(user.getRights());
		assertThat(result.getMoreInformations()).isEqualTo(user.getMoreInformations());
		assertThat(result.isDarkmode()).isEqualTo(user.isDarkmode());
		assertThat(result.getLastConnexion().toString()).isEqualTo(user.getLastConnexion().toString());
	}
	
	@Test
	public void testCreate_whenTownIsNull_thenThrowUserException() {
		user.setTown(null);

		UserException result = assertThrows(UserException.class, () -> testedObject.create(user));

		verify(userDaoMock, times(0)).save(Mockito.any(User.class));
		verify(townDaoMock, times(0)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(UserException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenEmailIsNull_thenThrowUserException() {
		user.setEmail(null);

		when(userDaoMock.save(Mockito.any(User.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		UserException result = assertThrows(UserException.class, () -> testedObject.create(user));

		verify(userDaoMock, times(1)).save(Mockito.any(User.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(UserException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenUsernameIsNull_thenThrowUserException() {
		user.setUsername(null);

		when(userDaoMock.save(Mockito.any(User.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		UserException result = assertThrows(UserException.class, () -> testedObject.create(user));

		verify(userDaoMock, times(1)).save(Mockito.any(User.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(UserException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenPasswordIsNull_thenThrowUserException() {
		user.setPassword(null);
		
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));

		UserException result = assertThrows(UserException.class, () -> testedObject.create(user));

		verify(userDaoMock, times(0)).save(Mockito.any(User.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(UserException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenRoleIsNull_thenThrowUserException() {
		user.setRights(null);

		when(userDaoMock.save(Mockito.any(User.class))).thenThrow(DataIntegrityViolationException.class);
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
		
		UserException result = assertThrows(UserException.class, () -> testedObject.create(user));

		verify(userDaoMock, times(1)).save(Mockito.any(User.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(UserException.INCOMPLETE_INFORMATIONS);
	}
	
	@Test
	public void testCreate_whenTownNotFound_thenThrowUserException() throws UserException {
		when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.empty());
		
		UserException result = assertThrows(UserException.class, () -> testedObject.create(user));

		verify(userDaoMock, times(0)).save(Mockito.any(User.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getMessage()).isEqualTo(UserException.TOWN_LOADING);
	}
	
	@Test
	public void testUpdate() throws Exception {
		UUID id2 = UUID.randomUUID();
		String email2 = "test2@test.test";
		String username2 = "tester2";
		String password2 = "test2";
		Integer rights2 = 2;
		User user2 = User.builder()
				.id(id2)
				.email(email2)
				.username(username2)
				.password(password2)
				.rights(rights2)
				.moreInformations(new ArrayList<>())
				.darkmode(false)
				.lastConnexion(LocalDateTime.now().minusDays(1))
				.build();
		
		
		when(userDaoMock.findById(id)).thenReturn(Optional.ofNullable(user));
		
		User result = testedObject.update(id, user2);

		assertThat(result.getId()).isEqualTo(id);
		assertThat(result.getEmail()).isEqualTo(user2.getEmail());
		assertThat(result.getUsername()).isEqualTo(user2.getUsername());
		assertThat(result.getPassword()).isEqualTo(user2.getPassword());
		assertThat(result.getRights()).isEqualTo(user2.getRights());
		assertThat(result.getMoreInformations()).isEqualTo(user2.getMoreInformations());
		assertThat(result.isDarkmode()).isEqualTo(user2.isDarkmode());
		assertThat(result.getLastConnexion()).isEqualTo(user2.getLastConnexion());
	}
	
	@Test
	public void testDelete() {
		testedObject.delete(id);

		verify(userDaoMock, times(1)).deleteById(id);
	}
	
}
