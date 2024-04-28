package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.PlayingCard;
import com.example.mybaitsplusdemo.mapper.PlayingCardMapper;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PlayingCardServiceTest {

    @Mock
    private PlayingCardMapper playingCardMapper;

    @Mock
    private Storage storage;

    @Mock
    private Blob blob;

    @InjectMocks
    private PlayingCardService playingCardService;

    @BeforeEach
    public void setUp() {
        // Mocking Google Cloud Storage interactions
        when(storage.create(any(BlobInfo.class), any(byte[].class))).thenReturn(blob);
        when(blob.getMediaLink()).thenReturn("http://example.com/media-link");
    }

    @Test
    public void testUploadFileToGCS() throws Exception {
        MockMultipartFile mockFile = new MockMultipartFile("file", "filename.jpg", "image/jpeg", "some-image-data".getBytes());

        String mediaLink = playingCardService.uploadFileToGCS(mockFile);

        verify(storage, times(1)).create(any(BlobInfo.class), eq("some-image-data".getBytes()));
        assert(mediaLink.equals("http://example.com/media-link"));
    }

    @Test
    public void testAddPlayingCard() throws Exception {
        MockMultipartFile mockFile = new MockMultipartFile("file", "filename.jpg", "image/jpeg", "some-image-data".getBytes());
        PlayingCard card = new PlayingCard();

        playingCardService.addPlayingCard(card, mockFile);

        verify(storage, times(1)).create(any(BlobInfo.class), eq("some-image-data".getBytes()));
        verify(playingCardMapper, times(1)).insert(any(PlayingCard.class));
    }
}

