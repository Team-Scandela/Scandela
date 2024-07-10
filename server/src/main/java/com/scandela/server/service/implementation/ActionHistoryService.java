package com.scandela.server.service.implementation;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.UserActionDao;
import com.scandela.server.entity.AuditEntry;
import com.scandela.server.entity.UserAction;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IActionHistoryService;

@Service
public class ActionHistoryService extends AbstractService<UserAction> implements IActionHistoryService {

    protected ActionHistoryService(UserActionDao userActionDao) {
		super(userActionDao);
	}

    @Override
    @Transactional(readOnly = true, rollbackFor = { Exception.class })
    public List<UserAction> create(List<UserAction> newUserActionList) throws Exception {
        List<UserAction> newList = new ArrayList<>();

        for (UserAction userAction : newUserActionList) {
            newList.add(sendPostToCreate(userAction));
        }

        return newList;
    }

    public UserAction sendPostToCreate(UserAction newUserAction) {
        try {
            URL url = new URL("http://localhost:8080/actionhistory/create");

            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");

            String auth = "Basic " + Base64.getEncoder().encodeToString("tester:T&st".getBytes(StandardCharsets.UTF_8));
            con.setRequestProperty("Authorization", auth);

            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

            con.setDoOutput(true);

            String formattedTimestamp = newUserAction.getTimestamp().toInstant()
                    .atOffset(java.time.ZoneOffset.UTC)
                    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX"));

            String body = null;

            if (newUserAction.getData().isEmpty())
                body = "{\"userid\":\"" + newUserAction.getUserid().toString() + "\",\"actiontype\":\"" + newUserAction.getActiontype() + "\",\"timestamp\":\"" + formattedTimestamp + "\",\"data\": \"\"}";
            else
                body = "{\"userid\":\"" + newUserAction.getUserid().toString() + "\",\"actiontype\":\"" + newUserAction.getActiontype() + "\",\"timestamp\":\"" + formattedTimestamp + "\",\"data\": \"" + newUserAction.getData() + "\" }";
            try (OutputStreamWriter writer = new OutputStreamWriter(con.getOutputStream(), StandardCharsets.UTF_8)) {
                writer.write(body);
            }

            int responseCode = con.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                return newUserAction;
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
