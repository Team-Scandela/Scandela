package com.scandela.server.dao.criteria;

import java.util.Optional;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserCriteria {

	// Attributes \\
		// Private \\
	private String email;
	private String username;

	// Methods \\
		// Public \\
	public Optional<String> getEmail() {
		return Optional.ofNullable(email);
	}

	public Optional<String> getUsername() {
		return Optional.ofNullable(username);
	}

}
