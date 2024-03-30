package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.Bulb;

public interface IBulbService extends IService<Bulb> {
	public List<Bulb> getAll(String name);
}
