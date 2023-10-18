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

        double tensionMoyenne = 8000; // Volts
        double courantMoyen = 0.05; // Ampères

        // Puissance(Watts) = Tension(Volts) * Courant(Ampères)
        double puissanceMoyenne = tensionMoyenne * courantMoyen; // Watts

        int fourchetteHoraireMoyenne = 7; // heures

        // COUTS -> Puissance * durée d’allumage sur 1 journée(Minutes) = Conso totale
        // journalière
        double consommationJournalière = puissanceMoyenne * fourchetteHoraireMoyenne / 1000; // kWh

        double indiceEmpreinteCarbonne = 0.5 /* moyenne CO2 / kWh */ * consommationJournalière;

        lightPoint.setMoreinfo("Infos:   Puissance -> " + puissanceMoyenne + "     Consommation journalière -> "
                + consommationJournalière + "     Empreinte carbonne -> " + indiceEmpreinteCarbonne);

        if (consommationJournalière > 2) {
            lightPoint.setMoreinfo(lightPoint.getMoreinfo()
                    + "\n WARNING: La Consommation Journalière dépasse le seuil recommandé (2kWh) pour un point lumineux moyen!");
        }

        if (indiceEmpreinteCarbonne > 1) {
            lightPoint.setMoreinfo(lightPoint.getMoreinfo()
                    + "\n WARNING: L'Empreinte d'émission de carbone dépasse le seuil recommandé (1kg CO2 / jour) pour un point lumineux moyen!");
        }

        return lightPoint;
    }
}
