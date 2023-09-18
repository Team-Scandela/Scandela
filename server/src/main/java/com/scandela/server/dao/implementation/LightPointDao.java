package com.scandela.server.dao.implementation;

import org.springframework.stereotype.Repository;

import com.scandela.server.dao.AbstractDao;
import com.scandela.server.dao.ILightPointDao;
import com.scandela.server.entity.LightPoint;

@Repository
public class LightPointDao extends AbstractDao<LightPoint> implements ILightPointDao {

    // Constructors \\
	protected LightPointDao() {
		super(LightPoint.class);
	}
}
