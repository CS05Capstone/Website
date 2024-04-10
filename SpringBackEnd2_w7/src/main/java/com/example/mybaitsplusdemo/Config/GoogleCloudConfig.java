package com.example.mybaitsplusdemo.Config;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.auth.oauth2.ServiceAccountCredentials;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

//@Configuration
public class GoogleCloudConfig {

    @Bean
    public Storage storage() throws IOException {
        // get the path in the envrionment virables
//        String keyPath = System.getenv("GOOGLE_CLOUD_KEY_PATH");
        String keyPath = System.getenv("GOOGLE_CLOUD_KEY_PATH");
        System.out.println(keyPath);
        if (keyPath == null || keyPath.isEmpty()) {
            throw new IOException("Environment variable GOOGLE_CLOUD_KEY_PATH is not set");
        }

        return StorageOptions.newBuilder()
                .setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream(keyPath)))
                .build()
                .getService();
    }
}
