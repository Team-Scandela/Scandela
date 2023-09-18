package com.scandela.server.service.implementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.ILightPointDao;
import com.scandela.server.entity.LightPoint;
import com.scandela.server.entity.dto.LightPointDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILightPopUpService;

public class LightPopUpService extends AbstractService implements ILightPopUpService {

    @Autowired
    private ILightPointDao lightPointDao;

    @Override
    @Transactional(readOnly = true)
    public LightPointDto getLightPopUpInfos(int id) {
        Optional<LightPoint> lightPoint = lightPointDao.get(id);

        if (lightPoint.isEmpty()) {
            return null;
        }

        return LightPointDto.from(lightPoint.get());
    }

    @Override
    public LightPointDto computeOptimisations(LightPointDto lightPointDto) {

        // Puissance(Watts) = Tension(Volts) * Courant(Ampères)

        // COUTS -> Puissance * durée d’allumage sur 1 journée(Minutes) = Conso totale
        // journalière

        // Plage Horaire -> Conso totale journalière * (CO2 / kWh) = Indice empreinte
        // carbone journalière

        return lightPointDto;
    }
}
