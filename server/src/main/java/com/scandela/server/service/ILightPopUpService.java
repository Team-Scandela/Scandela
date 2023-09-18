package com.scandela.server.service;

import com.scandela.server.entity.dto.LightPointDto;

public interface ILightPopUpService {
    public LightPointDto getLightPopUpInfos(int id);

    public LightPointDto computeOptimisations(LightPointDto lightPointDto);
}
