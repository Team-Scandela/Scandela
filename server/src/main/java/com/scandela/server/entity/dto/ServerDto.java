package com.scandela.server.entity.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ServerDto {
	
	private String name;
	private List<String> team;

}
