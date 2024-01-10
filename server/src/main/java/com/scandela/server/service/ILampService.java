package com.scandela.server.service;

import java.util.UUID;

import com.scandela.server.entity.Lamp;
import com.scandela.server.exception.LampException;

public interface ILampService extends IService<Lamp> {
    public Lamp computeOptimisations(UUID id) throws LampException;
}
