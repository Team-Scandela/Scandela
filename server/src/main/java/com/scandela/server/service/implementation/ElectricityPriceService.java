package com.scandela.server.service.implementation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.ElectricityPriceDao;
import com.scandela.server.entity.ElectricityPrice;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IElectricityPriceService;

import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class ElectricityPriceService extends AbstractService<ElectricityPrice> implements IElectricityPriceService {

	protected ElectricityPriceService(ElectricityPriceDao electricityPriceDao) {
		super(electricityPriceDao);
	}

	public String getLatestElectricityPrice() {
		URL obj;
		try {
			obj = new URL("https://digital.iservices.rte-france.com/token/oauth/");
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();

			// Configuration de la requête
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			con.setRequestProperty("Authorization",
			"Basic OGVjMjhmMGItMjJlZi00ZWY3LWIxYTItNWEwMjQzOTgxZjMxOmU4MGU5ZmE1LWNlZmQtNGQzNi1iYTc2LTcwZjYwNjM0MTYzYw==");

			// Récupération de la réponse
			int responseCode = con.getResponseCode();
			System.out.println("Code de réponse : " + responseCode);

			// Lecture de la réponse
			try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
				StringBuilder response = new StringBuilder();
				String inputLine;

				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}

				// Extrait "access_token" directement de la réponse JSON
				String jsonResponse = response.toString();

				return jsonResponse;
			}
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException ioe) {
			// TODO Auto-generated catch block
			ioe.printStackTrace();
		}
		return null;
	}
}
