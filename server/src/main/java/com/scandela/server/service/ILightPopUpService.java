package com.scandela.server.service;

import com.scandela.server.entity.LightPoint;

public interface ILightPopUpService extends IService<LightPoint> {
    public LightPoint computeOptimisations(LightPoint lightPoint);
    public LightPoint updateLightPoint(LightPoint toModify, LightPoint updatedData);
    public LightPoint getLightPointByUuid(String uuid);
}
