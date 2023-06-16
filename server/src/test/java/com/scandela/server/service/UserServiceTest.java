package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
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

import com.scandela.server.dao.criteria.UserCriteria;
import com.scandela.server.dao.implementation.UserDao;
import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.implementation.UserService;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {
	
	// Attributes \\
		// Private \\
	@InjectMocks
	private UserService testedObject;
	
	@Mock
	private UserDao userDaoMock;
	
	// Methods \\
		// Public \\
	@Test
	public void testGetUsers() {
		int id = 1;
		
		User user = User.builder()
				.id(id)
				.email("test@test.test")
				.username("tester")
				.password("test")
				.lastConnexion(LocalDate.now())
				.build();
		
		when(userDaoMock.getAll()).thenReturn(Arrays.asList(user));
		
		List<UserDto> result = testedObject.getUsers();
		
		verify(userDaoMock, times(1)).getAll();
		assertThat(result).hasSize(1);
		UserDto userDto = result.get(0);
		assertThat(userDto.getId()).isEqualTo(user.getId());
		assertThat(userDto.getEmail()).isEqualTo(user.getEmail());
		assertThat(userDto.getUsername()).isEqualTo(user.getUsername());
		assertThat(userDto.getPassword()).isEqualTo(user.getPassword());
		assertThat(userDto.getLastConnexion().toString()).isEqualTo(user.getLastConnexion().toString());
	}
	
	@Test
	public void testGetUsers_whenManyUsers_thenReturnManyDtos() {
		int id1 = 1;
		int id2 = 2;
		
		User user1 = User.builder()
				.id(id1)
				.email("test1@test1.test1")
				.username("tester1")
				.password("test1")
				.lastConnexion(LocalDate.now())
				.build();
		User user2 = User.builder()
				.id(id2)
				.email("test2@test2.test2")
				.username("tester2")
				.password("test2")
				.lastConnexion(LocalDate.now())
				.build();
		
		when(userDaoMock.getAll()).thenReturn(Arrays.asList(user1, user2));
		
		List<UserDto> result = testedObject.getUsers();
		
		verify(userDaoMock, times(1)).getAll();
		assertThat(result).hasSize(2);
	}
	
	@Test
	public void testGetUsers_whenNoUser_thenReturnEmptyList() {
		when(userDaoMock.getAll()).thenReturn(Arrays.asList());
		
		List<UserDto> result = testedObject.getUsers();

		verify(userDaoMock, times(1)).getAll();
		assertThat(result).isEmpty();
	}

	@Test
	public void testGetUser() {
		int id = 1;
		
		User user = User.builder()
				.id(id)
				.email("test@test.test")
				.username("tester")
				.password("test")
				.lastConnexion(LocalDate.now())
				.build();
		
		when(userDaoMock.get(id)).thenReturn(Optional.of(user));
		
		UserDto result = testedObject.getUser(id);
		
		verify(userDaoMock, times(1)).get(id);
		assertThat(result.getId()).isEqualTo(user.getId());
		assertThat(result.getEmail()).isEqualTo(user.getEmail());
		assertThat(result.getUsername()).isEqualTo(user.getUsername());
		assertThat(result.getPassword()).isEqualTo(user.getPassword());
		assertThat(result.getLastConnexion().toString()).isEqualTo(user.getLastConnexion().toString());
	}
	
	@Test
	public void testGetUser_whenIdNonExistant_thenReturnNull() {
		int id = 1;
		
		when(userDaoMock.get(id)).thenReturn(Optional.empty());
		
		UserDto result = testedObject.getUser(id);

		verify(userDaoMock, times(1)).get(id);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateUser() {
		int id = 1;
		String email = "test@test.test";
		String username = "tester";
		String password = "test";

		User user = User.builder()
				.id(id)
				.email(email)
				.username(username)
				.password(password)
				.build();
		
		UserCriteria criteriaEmail = UserCriteria.builder()
				.email(email)
				.build();
		UserCriteria criteriaUsername = UserCriteria.builder()
				.username(username)
				.build();
		
		when(userDaoMock.getByCriteria(criteriaEmail)).thenReturn(Optional.empty());
		when(userDaoMock.getByCriteria(criteriaUsername)).thenReturn(Optional.empty());
		when(userDaoMock.save(Mockito.any(User.class))).thenReturn(user);
		
		UserDto result = testedObject.createUser(email, username, password);

		verify(userDaoMock, times(1)).getByCriteria(criteriaEmail);
		verify(userDaoMock, times(1)).getByCriteria(criteriaUsername);
		verify(userDaoMock, times(1)).save(Mockito.any(User.class));
		assertThat(result.getId()).isEqualTo(user.getId());
		assertThat(result.getEmail()).isEqualTo(user.getEmail());
		assertThat(result.getUsername()).isEqualTo(user.getUsername());
		assertThat(result.getPassword()).isEqualTo(user.getPassword());
	}
	
	@Test
	public void testCreateUser_whenEmailCriteriaCorrespond_thenReturnNull() {
		String email = "test@test.test";
		String username = "tester";
		String password = "test";

		User user = User.builder()
				.email(email)
				.username(username)
				.password(password)
				.build();
		
		UserCriteria criteriaEmail = UserCriteria.builder()
				.email(email)
				.build();
		UserCriteria criteriaUsername = UserCriteria.builder()
				.username(username)
				.build();

		when(userDaoMock.getByCriteria(criteriaEmail)).thenReturn(Optional.of(user));
		
		UserDto result = testedObject.createUser(email, username, password);

		verify(userDaoMock, times(1)).getByCriteria(criteriaEmail);
		verify(userDaoMock, times(0)).getByCriteria(criteriaUsername);
		verify(userDaoMock, times(0)).save(user);
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateUser_whenUsernameCriteriaCorrespond_thenReturnNull() {
		String email = "test@test.test";
		String username = "tester";
		String password = "test";

		User user = User.builder()
				.email(email)
				.username(username)
				.password(password)
				.build();
		
		UserCriteria criteriaEmail = UserCriteria.builder()
				.email(email)
				.build();
		UserCriteria criteriaUsername = UserCriteria.builder()
				.username(username)
				.build();

		when(userDaoMock.getByCriteria(criteriaEmail)).thenReturn(Optional.empty());
		when(userDaoMock.getByCriteria(criteriaUsername)).thenReturn(Optional.of(user));
		
		UserDto result = testedObject.createUser(email, username, password);

		verify(userDaoMock, times(1)).getByCriteria(criteriaEmail);
		verify(userDaoMock, times(1)).getByCriteria(criteriaUsername);
		verify(userDaoMock, times(0)).save(user);
		assertThat(result).isNull();
	}
	
	@Test
	public void testDeleteUser() {
		int id = 1;
		
		User user = User.builder()
				.id(id)
				.email("test@test.test")
				.username("tester")
				.password("test")
				.lastConnexion(LocalDate.now())
				.build();
		
		when(userDaoMock.get(id)).thenReturn(Optional.of(user));
		
		testedObject.deleteUser(id);

		verify(userDaoMock, times(1)).get(id);
		verify(userDaoMock, times(1)).delete(user);
	}
	
	@Test
	public void testDeleteUser_whenNoUser() {
		int id = 1;

		when(userDaoMock.get(id)).thenReturn(Optional.empty());
		
		testedObject.deleteUser(id);

		verify(userDaoMock, times(1)).get(id);
		verify(userDaoMock, times(0)).delete(null);
	}
}
