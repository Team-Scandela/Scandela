package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.ElectricityPriceDao;
import com.scandela.server.entity.ElectricityPrice;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IElectricityPriceService;

@Service
public class ElectricityPriceService extends AbstractService<ElectricityPrice> implements IElectricityPriceService {

	protected ElectricityPriceService(ElectricityPriceDao electricityPriceDao) {
		super(electricityPriceDao);
	}
}
