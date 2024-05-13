package com.scandela.server.service.implementation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scandela.server.dao.ElectricityPriceDao;
import com.scandela.server.entity.ElectricityPrice;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IElectricityPriceService;

import java.net.URL;

@Service
public class ElectricityPriceService extends AbstractService<ElectricityPrice> implements IElectricityPriceService {

	protected ElectricityPriceService(ElectricityPriceDao electricityPriceDao) {
		super(electricityPriceDao);
	}

	@Value("${rteapi.clientKey}")
    private String clientKey;

	public String getoAuth2AccessToken() {
		URL obj;
		try {
			obj = new URL("https://digital.iservices.rte-france.com/token/oauth/");
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();

			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			con.setRequestProperty("Authorization", "Basic " + clientKey);

			try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
				StringBuilder response = new StringBuilder();
				String inputLine;

				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}

				String jsonResponse = response.toString();
				String accessToken = extractAccessToken(jsonResponse);

				return accessToken;
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
		return null;
	}

	private static String extractAccessToken(String jsonResponse) {
        int startIndex = jsonResponse.indexOf("\"access_token\":") + "\"access_token\":".length() + 6;
        int endIndex = jsonResponse.indexOf(",", startIndex);

        if (startIndex != -1 && endIndex != -1) {
            return jsonResponse.substring(startIndex, endIndex).replaceAll("\"", "").trim();
        } else {
            return null;
        }
    }

	public ElectricityPrice getLastElectricityPrice(String accessToken) {

		/* Tester la connexion à l'API (parfois down)*/
		// try {
		// 	URL url = new URL("https://digital.iservices.rte-france.com/open_api");
		// 	HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		// 	connection.setRequestMethod("GET");
		// 	connection.setRequestProperty("Authorization", "Bearer " + accessToken);
		// 	int responseCode = connection.getResponseCode();
		// 	System.out.println("response code to elec price ==> " + responseCode);
		// 	if (responseCode > 300) {
		// 		return null;
		// 	}
		// } catch (IOException e) {
		// 	e.printStackTrace();
		// 	return null;
		// }

		URL obj;
		try {
			obj = new URL("https://digital.iservices.rte-france.com/open_api/wholesale_market/v2/france_power_exchanges");
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();

			con.setRequestMethod("GET");
			con.setRequestProperty("Authorization", "Bearer " + accessToken);

			int responseCode = con.getResponseCode();
			System.out.println("Code de réponse : " + responseCode);

			try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
				StringBuilder response = new StringBuilder();
				String inputLine;

				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}

				// Faire le parsing de la réponse
				return parseElectricityPriceValues(response.toString());
			}

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}

		return null;
	}

	private static ElectricityPrice parseElectricityPriceValues(String response) {
		try {

			ElectricityPrice newElectricityPrice = new ElectricityPrice();
			ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);

			JsonNode valuesArray = jsonNode
					.path("france_power_exchanges")
					.get(0)
					.path("values");

			if (valuesArray.isArray() && valuesArray.size() > 0) {
				JsonNode lastValue = valuesArray.get(valuesArray.size() - 1);

				String startDate = lastValue.path("start_date").asText();
				String endDate = lastValue.path("end_date").asText();
				double price = lastValue.path("price").asDouble();

				newElectricityPrice.setStartDate(startDate);
				newElectricityPrice.setEndDate(endDate);
				newElectricityPrice.setPrice(price);

				return newElectricityPrice;
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}
}
