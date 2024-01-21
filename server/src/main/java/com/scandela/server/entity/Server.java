package com.scandela.server.entity;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Server {

	// Attributes \\
	// Private \\
	private String name;
	private List<String> team;

}
