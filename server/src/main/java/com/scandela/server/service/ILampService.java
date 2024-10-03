package com.scandela.server.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

import com.opencsv.exceptions.CsvValidationException;
import com.scandela.server.entity.Lamp;
import com.scandela.server.exception.LampException;

public interface ILampService extends IService<Lamp> {
	public List<Lamp> getAll(String name);
    // public List<Lamp> getAllMainLamps();
    // public List<Lamp> getAllOtherLamps();
    public Lamp computeOptimisations(UUID id) throws LampException;
    public List<Lamp> getAllByCoordinates(List<Pair<Double, Double>> coordinates);
    public double computeGlobalLightIndicator(List<Lamp> lamps);
    public double computeGlobalEnergyConsumption(List<Lamp> lamps);
	public double computeGlobalDistanceVegetalZone(List<Lamp> lamps) throws IOException, CsvValidationException;
}
