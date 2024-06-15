package com.scandela.server.entity.dto;

import java.io.Serializable;
import java.util.UUID;

import com.scandela.server.entity.Lamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class LampDto implements Serializable {

	// Attributes \\
		// Private \\
	private static final long serialVersionUID = 1L;

	private UUID id;
	private String name;
	private String lampType;
	private String foyerType;
	private Double latitude;
	private Double longitude;
	private Integer lum;
	private Double height;
	
	// Methods \\
		// Public \\
	public static LampDto from(Lamp lamp) {
		return LampDto.builder()
				.id(lamp.getId())
				.name(lamp.getName())
				.lampType(lamp.getLampType())
				.foyerType(lamp.getFoyerType())
				.latitude(lamp.getLatitude())
				.longitude(lamp.getLongitude())
				.lum(1)
				.height(lamp.getHeight())
				.build();
	}
}
