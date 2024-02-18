package com.scandela.server.service.implementation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.scandela.server.dao.PriceLimitDao;
import com.scandela.server.entity.PriceLimit;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IPriceLimitService;


@Service
public class PriceLimitService extends AbstractService<PriceLimit> implements IPriceLimitService {
    protected PriceLimitService(PriceLimitDao priceLimitDao) {
		super(priceLimitDao);
	}

	@Value("${logs.username}")
    private String username;

	@Value("${logs.pwd}")
    private String pwd;

	@Scheduled(fixedRate = 3600000)
	public void checkUsersLimits() {
		List<PriceLimit> priceLimits = super.getAll();

		URL obj;
		String encodedKey = Base64.getEncoder().encodeToString(("username" + ":" + "pwd").getBytes());
	
		try {
			obj = new URL("http://localhost:8080/electricityPrice");
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
	
			con.setRequestMethod("GET");
			// con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			con.setRequestProperty("Authorization", "Basic " + encodedKey);
	
			try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
				StringBuilder response = new StringBuilder();
				String inputLine;
	
				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}
	
				String jsonResponse = response.toString();
				Double value = Double.valueOf(extractPriceValue(jsonResponse));

				for (PriceLimit limit : priceLimits) {
					checkLimit(limit, value);
				}
	
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}

	private void checkLimit(PriceLimit limite, Double currentPrice) {
        // if ("HAUT".equals(limite.getLimitSide()) && prixActuel > limite.getValue()) {
        //     declencherNotification(limite, "Le prix de l'électricité a dépassé la limite supérieure.");
        // } else if ("BAS".equals(limite.getLimitSide()) && prixActuel < limite.getValue()) {
        //     declencherNotification(limite, "Le prix de l'électricité est inférieur à la limite inférieure.");
        // }
    }

	private static String extractPriceValue(String jsonResponse) {
        int startIndex = jsonResponse.indexOf("\"price\":") + "\"price\":".length() + 3;
        int endIndex = jsonResponse.indexOf("\n", startIndex);

        if (startIndex != -1 && endIndex != -1) {
            return jsonResponse.substring(startIndex, endIndex).replaceAll("\"", "").trim();
        } else {
            return null;
        }
    }
}
