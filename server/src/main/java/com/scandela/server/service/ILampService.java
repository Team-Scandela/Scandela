package com.scandela.server.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.util.Pair;

import java.io.IOException;

import com.opencsv.exceptions.CsvValidationException;
import com.scandela.server.entity.Lamp;
import com.scandela.server.exception.LampException;

public interface ILampService extends IService<Lamp> {
	public List<Lamp> getAll(String name);
    public Lamp computeOptimisations(UUID id) throws LampException;
    public List<Lamp> getAllByCoordinates(List<Pair<Double, Double>> coordinates);
    public double computeGlobalEnergyConsumption();
	public double computeGlobalDistanceVegetalZone() throws IOException, CsvValidationException;
}
