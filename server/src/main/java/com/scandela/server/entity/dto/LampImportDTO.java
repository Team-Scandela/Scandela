package com.scandela.server.entity.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class LampImportDTO {
    private String name;
    private String address;
    private UUID bulbId;
    private Integer bulbLifetime;
    private Double latitude;
    private Double longitude;
    private Double height;
    private String lampType;
    private String foyerType;
}
