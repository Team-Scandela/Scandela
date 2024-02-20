package com.scandela.server.service;

import com.scandela.server.entity.ElectricityPrice;

public interface IElectricityPriceService extends IService<ElectricityPrice> {

    public String getoAuth2AccessToken();
    public ElectricityPrice getLastElectricityPrice(String accessToken);

}
