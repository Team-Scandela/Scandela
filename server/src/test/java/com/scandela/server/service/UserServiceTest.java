package com.scandela.server.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
				.role("role")
				.moreInfo(new ArrayList<>())
				.darkmode(true)
				.lastConnexion(LocalDateTime.now())
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
		assertThat(userDto.getRole()).isEqualTo(user.getRole());
		assertThat(userDto.getMoreInfo()).isEqualTo(user.getMoreInfo());
		assertThat(userDto.isDarkmode()).isEqualTo(user.isDarkmode());
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
				.role("role1")
				.lastConnexion(LocalDateTime.now())
				.build();
		User user2 = User.builder()
				.id(id2)
				.email("test2@test2.test2")
				.username("tester2")
				.password("test2")
				.role("role2")
				.lastConnexion(LocalDateTime.now())
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
				.role("role")
				.moreInfo(new ArrayList<>())
				.darkmode(true)
				.lastConnexion(LocalDateTime.now())
				.build();
		
		when(userDaoMock.get(id)).thenReturn(Optional.of(user));
		
		UserDto result = testedObject.getUser(id);
		
		verify(userDaoMock, times(1)).get(id);
		assertThat(result.getId()).isEqualTo(user.getId());
		assertThat(result.getEmail()).isEqualTo(user.getEmail());
		assertThat(result.getUsername()).isEqualTo(user.getUsername());
		assertThat(result.getPassword()).isEqualTo(user.getPassword());
		assertThat(result.getRole()).isEqualTo(user.getRole());
		assertThat(result.getMoreInfo()).isEqualTo(user.getMoreInfo());
		assertThat(result.isDarkmode()).isEqualTo(user.isDarkmode());
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
		String role = "role";

		User user = User.builder()
				.id(id)
				.email(email)
				.username(username)
				.password(password)
				.role(role)
				.build();

		User userWithId = User.builder()
				.id(id)
				.email(email)
				.username(username)
				.password(password)
				.role(role)
				.build();
		
		UserCriteria criteriaEmail = UserCriteria.builder()
				.email(email)
				.build();
		UserCriteria criteriaUsername = UserCriteria.builder()
				.username(username)
				.build();
		
		when(userDaoMock.getByCriteria(criteriaEmail)).thenReturn(Optional.empty());
		when(userDaoMock.getByCriteria(criteriaUsername)).thenReturn(Optional.empty());
		when(userDaoMock.save(Mockito.any(User.class))).thenReturn(userWithId);
		
		UserDto result = testedObject.createUser(user);

		verify(userDaoMock, times(1)).getByCriteria(criteriaEmail);
		verify(userDaoMock, times(1)).getByCriteria(criteriaUsername);
		verify(userDaoMock, times(1)).save(Mockito.any(User.class));
		assertThat(result.getId()).isEqualTo(userWithId.getId());
		assertThat(result.getEmail()).isEqualTo(userWithId.getEmail());
		assertThat(result.getUsername()).isEqualTo(userWithId.getUsername());
		assertThat(result.getPassword()).isEqualTo(userWithId.getPassword());
	}
	
	@Test
	public void testCreateUser_whenEmailIsNull_thenReturnNull() {
		String username = "tester";
		String password = "test";
		String role = "role";

		User user = User.builder()
				.username(username)
				.password(password)
				.role(role)
				.build();
		
		UserDto result = testedObject.createUser(user);

		verify(userDaoMock, times(0)).save(Mockito.any(User.class));
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateUser_whenUsernameIsNull_thenReturnNull() {
		String email = "test@test.test";
		String password = "test";
		String role = "role";

		User user = User.builder()
				.email(email)
				.password(password)
				.role(role)
				.build();
		
		UserDto result = testedObject.createUser(user);

		verify(userDaoMock, times(0)).save(Mockito.any(User.class));
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateUser_whenPasswordIsNull_thenReturnNull() {
		String email = "test@test.test";
		String username = "tester";
		String role = "role";

		User user = User.builder()
				.email(email)
				.username(username)
				.role(role)
				.build();
		
		UserDto result = testedObject.createUser(user);

		verify(userDaoMock, times(0)).save(Mockito.any(User.class));
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateUser_whenEmailCriteriaCorrespond_thenReturnNull() {
		String email = "test@test.test";
		String username = "tester";
		String password = "test";
		String role = "role";

		User user = User.builder()
				.email(email)
				.username(username)
				.password(password)
				.role(role)
				.build();
		
		UserCriteria criteriaEmail = UserCriteria.builder()
				.email(email)
				.build();
		UserCriteria criteriaUsername = UserCriteria.builder()
				.username(username)
				.build();

		when(userDaoMock.getByCriteria(criteriaEmail)).thenReturn(Optional.of(user));
		
		UserDto result = testedObject.createUser(user);

		verify(userDaoMock, times(1)).getByCriteria(criteriaEmail);
		verify(userDaoMock, times(0)).getByCriteria(criteriaUsername);
		verify(userDaoMock, times(0)).save(Mockito.any(User.class));
		assertThat(result).isNull();
	}
	
	@Test
	public void testCreateUser_whenUsernameCriteriaCorrespond_thenReturnNull() {
		String email = "test@test.test";
		String username = "tester";
		String password = "test";
		String role = "role";

		User user = User.builder()
				.email(email)
				.username(username)
				.password(password)
				.role(role)
				.build();
		
		UserCriteria criteriaEmail = UserCriteria.builder()
				.email(email)
				.build();
		UserCriteria criteriaUsername = UserCriteria.builder()
				.username(username)
				.build();

		when(userDaoMock.getByCriteria(criteriaEmail)).thenReturn(Optional.empty());
		when(userDaoMock.getByCriteria(criteriaUsername)).thenReturn(Optional.of(user));
		
		UserDto result = testedObject.createUser(user);

		verify(userDaoMock, times(1)).getByCriteria(criteriaEmail);
		verify(userDaoMock, times(1)).getByCriteria(criteriaUsername);
		verify(userDaoMock, times(0)).save(Mockito.any(User.class));
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
				.role("role")
				.lastConnexion(LocalDateTime.now())
				.build();
		
		testedObject.deleteUser(user);

		verify(userDaoMock, times(1)).delete(user);
	}
	
}
