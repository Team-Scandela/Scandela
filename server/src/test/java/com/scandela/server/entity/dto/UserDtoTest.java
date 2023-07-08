package com.scandela.server.entity.dto;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import com.scandela.server.entity.User;

@RunWith(MockitoJUnitRunner.class)
public class UserDtoTest {
	
	// Methods \\
		// Public \\
	@Test
	public void testFrom() {
		User user = User.builder()
				.id(1)
				.email("test@test.test")
				.username("tester")
				.password("test")
				.role("testing")
				.moreInfo(Arrays.asList("A", "B", "z"))
				.darkmode(true)
				.lastConnexion(LocalDateTime.now())
				.build();
		
		UserDto result = UserDto.from(user);
		assertThat(result.getId()).isEqualTo(user.getId());
		assertThat(result.getEmail()).isEqualTo(user.getEmail());
		assertThat(result.getUsername()).isEqualTo(user.getUsername());
		assertThat(result.getPassword()).isEqualTo(user.getPassword());
		assertThat(result.getRole()).isEqualTo(user.getRole());
		assertThat(result.getMoreInfo()).isEqualTo(user.getMoreInfo());
		assertThat(result.isDarkmode()).isEqualTo(user.isDarkmode());
		assertThat(result.getLastConnexion().toString()).isEqualTo(user.getLastConnexion().toString());
	}

}
