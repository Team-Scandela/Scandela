package com.scandela.server.entity.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LoginDto {

	// Attributes \\
	// Private \\
	private String email;
    private String password;

}