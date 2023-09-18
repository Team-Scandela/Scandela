package com.scandela.server.entity.dto;

import java.util.List;

import com.scandela.server.entity.LightPoint;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LightPointDto {
    private Integer id;

	private List<String> recommandedOptimisations;


    public static LightPointDto from(LightPoint lightPoint) {
		LightPointDto lightPointDto = LightPointDto.builder()
				.id(lightPoint.getId())
				.recommandedOptimisations(lightPoint.getRecommandedOptimisations())
				.build();

		return lightPointDto;
	}
}
