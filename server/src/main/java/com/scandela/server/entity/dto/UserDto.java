package com.scandela.server.entity.dto;

import java.time.LocalDate;

import com.scandela.server.entity.User;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDto {

	// Attributes \\
		// Private \\
	private int id;
//	private TownDto town;
	private String email;
	private String username;
	private String password;
	private LocalDate lastConnexion;

	// Methods \\
		// Public \\
	public static UserDto from(User user) {
		UserDto userDto = UserDto.builder()
				.id(user.getId())
//				.town(user.getTown())
				.email(user.getEmail())
				.username(user.getUsername())
				.password(user.getPassword())
				.lastConnexion(user.getLastConnexion())
				.build();

		return userDto;
	}

}
