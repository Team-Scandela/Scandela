package com.scandela.server.dao.criteria;

import java.util.Optional;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserCriteria {

	private String email;
	private String username;

	public Optional<String> getEmail() {
		return Optional.ofNullable(email);
	}

	public Optional<String> getUsername() {
		return Optional.ofNullable(username);
	}

}
