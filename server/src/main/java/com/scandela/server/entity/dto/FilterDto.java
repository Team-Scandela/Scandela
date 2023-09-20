package com.scandela.server.entity.dto;


import com.scandela.server.entity.Filter;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FilterDto {
    private Integer id;
    private Boolean isActive;

    public static FilterDto from(Filter filter) {
        FilterDto filterDto = FilterDto.builder()
        .id(filter.getId())
        .isActive(filter.getIsActive())
        .build();

        return filterDto;
    }

}