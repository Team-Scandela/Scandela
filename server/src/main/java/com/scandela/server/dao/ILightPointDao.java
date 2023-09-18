package com.scandela.server.dao;

import java.util.Optional;

import com.scandela.server.entity.LightPoint;

public interface ILightPointDao {
    public Optional<LightPoint> get(int id);
}
