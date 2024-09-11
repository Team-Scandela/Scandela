package com.scandela.server.service;

import java.util.UUID;

import com.scandela.server.entity.LampReparation;

public interface ILampReparationService extends IService<LampReparation> {
	public LampReparation addComment(UUID id, String comment) throws Exception;
	public LampReparation finish(UUID id, int duration) throws Exception;
}
