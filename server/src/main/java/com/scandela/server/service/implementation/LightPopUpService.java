package com.scandela.server.service.implementation;

import com.scandela.server.dao.implementation.LightPointDao;
import com.scandela.server.entity.LightPoint;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILightPopUpService;

public class LightPopUpService extends AbstractService<LightPoint> implements ILightPopUpService {

    protected LightPopUpService(LightPointDao lightPointDao) {
        super(lightPointDao);
    }

    @Override
    public LightPoint computeOptimisations(LightPoint lightPoint) {

        // Puissance(Watts) = Tension(Volts) * Courant(Ampères)

        // COUTS -> Puissance * durée d’allumage sur 1 journée(Minutes) = Conso totale
        // journalière

        // Plage Horaire -> Conso totale journalière * (CO2 / kWh) = Indice empreinte
        // carbone journalière

        return lightPoint;
    }
}
