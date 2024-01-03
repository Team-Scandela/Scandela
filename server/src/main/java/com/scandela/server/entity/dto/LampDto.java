package com.scandela.server.entity.dto;

import java.io.Serializable;
import java.util.UUID;

import com.scandela.server.entity.Lamp;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
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
	private Double latitude;
	private Double longitude;
	
	// Methods \\
		// Public \\
	public static LampDto from(Lamp lamp) {
		return LampDto.builder()
				.id(lamp.getId())
				.latitude(lamp.getLatitude())
				.longitude(lamp.getLongitude())
				.build();
	}
}
