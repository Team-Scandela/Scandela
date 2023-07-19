package com.scandela.server.entity.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.scandela.server.entity.User;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDto {

	// Attributes \\
		// Private \\
	private int id;
	private TownDto town;
	private String email;
	private String username;
	private String password;
	private String role;
	private List<String> moreInfo;
	private boolean darkmode;
	private LocalDateTime lastConnexion;

	// Methods \\
		// Public \\
	public static UserDto from(User user) {
		UserDto userDto = UserDto.builder()
				.id(user.getId())
				.town(TownDto.from(user.getTown()))
				.email(user.getEmail())
				.username(user.getUsername())
				.password(user.getPassword())
				.role(user.getRole())
				.moreInfo(user.getMoreInfo())
				.darkmode(user.isDarkmode())
				.lastConnexion(user.getLastConnexion())
				.build();

		return userDto;
	}

}
