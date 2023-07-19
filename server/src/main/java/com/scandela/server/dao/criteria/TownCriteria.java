package com.scandela.server.dao.criteria;

import java.util.Optional;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TownCriteria {

	// Attributes \\
		// Private \\
	private String name;

	// Methods \\
		// Public \\
	public Optional<String> getName() {
		return Optional.ofNullable(name);
	}

}
