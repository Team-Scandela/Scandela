package com.scandela.server.service.implementation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scandela.server.dao.PriceLimitDao;
import com.scandela.server.dao.UserDao;
import com.scandela.server.entity.PriceLimit;
import com.scandela.server.entity.User;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IEmailService;
import com.scandela.server.service.IPriceLimitService;


@Service
public class PriceLimitService extends AbstractService<PriceLimit> implements IPriceLimitService {
	@Value("${logs.username}")
	private String username;

	@Value("${logs.pwd}")
	private String pwd;

	private UserDao userDao;

	@Autowired
	private IEmailService emailService;

    protected PriceLimitService(PriceLimitDao priceLimitDao, UserDao userDao) {
		super(priceLimitDao);
		this.userDao = userDao;
	}


	@Scheduled(initialDelay = 5000, fixedRate = 3600000)
	public void checkUsersLimits() {
		List<PriceLimit> priceLimits = super.getAll();

		URL obj;
		String credentials = username + ":" + pwd;
		String encodedKey = Base64.getEncoder().encodeToString(credentials.getBytes(StandardCharsets.UTF_8));

		try {
			obj = new URL("https://api.scandela.com/electricityPrice");
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();

			if (con != null) {

				if (con.getResponseCode() < 300) {
					con.setRequestMethod("GET");
					con.setRequestProperty("Authorization", "Basic " + encodedKey);

					try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
						StringBuilder response = new StringBuilder();
						String inputLine;

						while ((inputLine = in.readLine()) != null) {
							response.append(inputLine);
						}

						String jsonResponse = response.toString();
						ObjectMapper objectMapper = new ObjectMapper();
						JsonNode jsonNode = objectMapper.readTree(jsonResponse);
						double priceValue = jsonNode.get("price").asDouble();

						Double value = Double.valueOf(priceValue);

						for (PriceLimit limit : priceLimits) {
							checkLimit(limit, value);
						}
					}
				}

			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}

	private void checkLimit(PriceLimit limit, Double currentPrice) {
		Optional<User> user = userDao.findById(UUID.fromString(limit.getUserid()));

		if (limit.getTriggeredstate() == true)
			return;

        if ("UP".equals(limit.getLimitside()) && currentPrice > limit.getValue()) {
			emailService.sendMail(user.get().getEmail(),  "[Scandela] - Price limit reached", "Le prix de l'électricité a dépassé la limite supérieure que vous avez fixé.");
        } else if ("DOWN".equals(limit.getLimitside()) && currentPrice < limit.getValue()) {
			emailService.sendMail(user.get().getEmail(), "[Scandela] - Price limit reached", "Le prix de l'électricité a dépassé la limite inférieure que vous avez fixé.");
        }

		// update le nouveau trigger state dans la db
    }
}
