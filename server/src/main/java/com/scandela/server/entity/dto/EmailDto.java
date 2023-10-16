package com.scandela.server.entity.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data

public class EmailDto {
    private Integer id;
    private String sender;

    // public static EmailDto from(Email email) {
    //     EmailDto emailDto = EmailDto.builder()
    //         .id(email.id)
    //         .sender(email.sender)
    //         .build();
    // }
}
