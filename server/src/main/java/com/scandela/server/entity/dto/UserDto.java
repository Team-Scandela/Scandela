package com.scandela.server.entity.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDto {
	
	private int id;
	private String email;

}
