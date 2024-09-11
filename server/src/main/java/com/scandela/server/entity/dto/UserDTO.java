package com.scandela.server.entity.dto;

import java.io.Serializable;
import java.util.UUID;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@EqualsAndHashCode
public class UserDTO implements Serializable {
    private UUID id;
    private String username;
    private String email;
    private UUID townId;


    public UserDTO(UUID id, String username, String email, UUID townId) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.townId = townId;
    }

}
