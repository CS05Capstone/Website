package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.PlayingCard;
import com.example.mybaitsplusdemo.mapper.PlayingCardMapper;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PlayingCardService {

    @Autowired
    private PlayingCardMapper playingCardMapper;

//    @Autowired
    private Storage storage;

    public String uploadFileToGCS(MultipartFile file) {
        String bucketName = "avatar_image_1";
        BlobId blobId = BlobId.of(bucketName, file.getOriginalFilename());
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

        byte[] bytes = null;
        try {
            bytes = file.getBytes();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to read bytes from the file.");
        }

        Blob blob = storage.create(blobInfo, bytes);
        return blob.getMediaLink();
    }
    public void addPlayingCard(PlayingCard card, MultipartFile avatar) {
        String avatarPath = uploadFileToGCS(avatar);
        card.setAvatarPath(avatarPath);
        playingCardMapper.insert(card);
    }
}
