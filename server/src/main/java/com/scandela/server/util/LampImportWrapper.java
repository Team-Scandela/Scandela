package com.scandela.server.util;

import java.util.List;

import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.dto.LampImportDTO;

import lombok.Data;

@Data
public class LampImportWrapper {
    private List<LampImportDTO> lamps;
}
