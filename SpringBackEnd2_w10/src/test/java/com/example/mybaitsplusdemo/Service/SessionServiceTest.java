package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.RequestBody.SessionDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionOutcomeDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionRequestDTO;
import com.example.mybaitsplusdemo.entity.Activity;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import com.example.mybaitsplusdemo.entity.Session;
import com.example.mybaitsplusdemo.mapper.ActivityMapper;
import com.example.mybaitsplusdemo.mapper.LearningOutcomeMapper;
import com.example.mybaitsplusdemo.mapper.SessionMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @Mock
    private SessionMapper sessionMapper;

    @Mock
    private ActivityMapper activityMapper;

    @Mock
    private LearningOutcomeMapper learningOutcomeMapper;

    @InjectMocks
    private SessionService sessionService;

    @Test
    public void testCreateSession() {
        SessionDTO mockSessionDTO = new SessionDTO();
        Session mockSession = new Session();
        mockSession.setId(1L);
        mockSessionDTO.setSession(mockSession);

        mockSessionDTO.setLearningOutcomes(new ArrayList<>());

        Map<String, Object> cascadenData = new HashMap<>();
        cascadenData.put("label", "Test Module");
        mockSessionDTO.setCascaderData(Arrays.asList(cascadenData));

        when(sessionMapper.insertSession(mockSession)).thenReturn(1L);

        int result = sessionService.createSession(mockSessionDTO);

        assertEquals(1, result);
        verify(sessionMapper, times(1)).insertSession(any(Session.class));
    }

    @Test
    public void testGetSessionById() {
        Long id = 1L;
        Session mockSession = new Session();
        when(sessionMapper.findSessionById(id)).thenReturn(mockSession);

        Session result = sessionService.getSessionById(id);

        assertEquals(mockSession, result);
        verify(sessionMapper, times(1)).findSessionById(id);
    }

    @Test
    public void testGetAllSessions() {
        List<Session> mockSessions = Arrays.asList(new Session(), new Session());
        when(sessionMapper.findAllSessions()).thenReturn(mockSessions);

        List<Session> result = sessionService.getAllSessions();

        assertEquals(mockSessions, result);
        verify(sessionMapper, times(1)).findAllSessions();
    }

    @Test
    public void testDeleteSession() {
        Long id = 1L;
        sessionService.deleteSession(id);

        // This assumes that you have the method `deleteSession` in your SessionMapper.
        verify(sessionMapper, times(1)).deleteSession(id);
    }

    @Test
    public void testGetSessionsByCaseworkerId() {
        Long id = 1L;
        List<Session> mockSessions = Arrays.asList(new Session(), new Session());
        when(sessionMapper.findSessionsByCaseworkerId(id)).thenReturn(mockSessions);

        List<Session> result = sessionService.getSessionsByCaseworkerId(id);

        assertEquals(mockSessions, result);
        verify(sessionMapper, times(1)).findSessionsByCaseworkerId(id);
    }

    @Test
    public void testGetSessionsByTeenagerName() {
        String name = "John Doe";
        List<Session> mockSessions = Arrays.asList(new Session(), new Session());
        when(sessionMapper.findSessionsByTeenagerName(name)).thenReturn(mockSessions);

        List<Session> result = sessionService.getSessionsByTeenagerName(name);

        assertEquals(mockSessions, result);
        verify(sessionMapper, times(1)).findSessionsByTeenagerName(name);
    }

    @Test
    public void testGetSessionDetailsById() {
        Long id = 1L;
        Session mockSession = new Session();
        List<Long> mockActivityIds = Arrays.asList(2L, 3L);
        Activity mockActivity1 = new Activity();
        Activity mockActivity2 = new Activity();

        when(sessionMapper.findSessionById(id)).thenReturn(mockSession);
        when(sessionMapper.findActivityIdsBySessionId(id)).thenReturn(mockActivityIds);
        when(activityMapper.findById(2L)).thenReturn(mockActivity1);
        when(activityMapper.findById(3L)).thenReturn(mockActivity2);

        Map<String, Object> result = sessionService.getSessionDetailsById(id);

        assertTrue(result.containsKey("session"));
        assertTrue(result.containsKey("activities"));
        assertEquals(mockSession, result.get("session"));
        verify(sessionMapper, times(1)).findSessionById(id);
        verify(sessionMapper, times(1)).findActivityIdsBySessionId(id);
        verify(activityMapper, times(1)).findById(2L);
        verify(activityMapper, times(1)).findById(3L);
    }

    @Test
    public void testGetLearningOutcomeIdsBySession() {
        Long sessionId = 1L;
        List<Long> mockOutcomeIds = Arrays.asList(2L, 3L);
        when(sessionMapper.findLearningOutcomeIdsBySessionId(sessionId)).thenReturn(mockOutcomeIds);

        List<Long> result = sessionService.getLearningOutcomeIdsBySession(sessionId);

        assertEquals(mockOutcomeIds, result);
        verify(sessionMapper, times(1)).findLearningOutcomeIdsBySessionId(sessionId);
    }

    @Test
    public void testGetOutcomesBySessionId() {
        Long sessionId = 1L;
        List<SessionOutcomeDTO> mockOutcomes = Arrays.asList(new SessionOutcomeDTO(), new SessionOutcomeDTO());
        when(sessionMapper.getOutcomesBySessionId(sessionId)).thenReturn(mockOutcomes);

        List<SessionOutcomeDTO> result = sessionService.getOutcomesBySessionId(sessionId);

        assertEquals(mockOutcomes, result);
        verify(sessionMapper, times(1)).getOutcomesBySessionId(sessionId);
    }
}

