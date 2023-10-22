package com.scandela.server.service;

import com.scandela.server.entity.LightPoint;

public interface ILightPopUpService extends IService<LightPoint> {
    public LightPoint computeOptimisations(LightPoint lightPoint);
}