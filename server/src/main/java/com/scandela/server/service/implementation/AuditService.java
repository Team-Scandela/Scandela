package com.scandela.server.service.implementation;

import org.springframework.stereotype.Service;

import com.scandela.server.dao.AuditEntryDao;
import com.scandela.server.entity.AuditEntry;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IAuditService;

import jakarta.transaction.Transactional;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuditService extends AbstractService<AuditEntry> implements IAuditService {

    private static final Logger logger = LoggerFactory.getLogger(AuditService.class);

    protected AuditService(AuditEntryDao auditEntryDao) {
        super(auditEntryDao);
    }

    @Override
    @Transactional
    public AuditEntry create(AuditEntry newAuditEntry) {
        logger.info("Audit entry saved: {}", newAuditEntry);
        return dao.save(newAuditEntry);
    }

    public void sendPostToCreate(AuditEntry newAuditEntry) {
        try {
            URL url = new URL("https://api.scandela.com/audit/create");

            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");

            String auth = "Basic " + Base64.getEncoder().encodeToString("tester:T&st".getBytes(StandardCharsets.UTF_8));
            con.setRequestProperty("Authorization", auth);

            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

            con.setDoOutput(true);

            String formattedTimestamp = newAuditEntry.getTimestamp().toInstant()
                    .atOffset(java.time.ZoneOffset.UTC)
                    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX"));

            String body = null;

            if (newAuditEntry.getData().isEmpty())
                body = "{\"userid\":\"" + newAuditEntry.getUserid().toString() + "\",\"action\":\"" + newAuditEntry.getAction() + "\",\"timestamp\":\"" + formattedTimestamp + "\",\"data\": []}";
            else
                body = "{\"userid\":\"" + newAuditEntry.getUserid().toString() + "\",\"action\":\"" + newAuditEntry.getAction() + "\",\"timestamp\":\"" + formattedTimestamp + "\",\"data\": [ \"" + newAuditEntry.getData().get(0) + "\" ]}";
            try (OutputStreamWriter writer = new OutputStreamWriter(con.getOutputStream(), StandardCharsets.UTF_8)) {
                writer.write(body);
            }

            // Obtenir le code de réponse
            int responseCode = con.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Lire la réponse
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Traiter la réponse réussie
                // ...
            } else {
                // Traiter l'erreur
                // ...
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}