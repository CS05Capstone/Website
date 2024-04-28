package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.RequestBody.LearningOutcomeDTO;
import com.example.mybaitsplusdemo.RequestBody.LearningOutcomeUpdateDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionOutcomeDTO;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import com.example.mybaitsplusdemo.mapper.LearningOutcomeMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

public class LearningOutcomeServiceTest {

    @InjectMocks
    private LearningOutcomeService service;

    @Mock
    private LearningOutcomeMapper learningOutcomeMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetLearningOutcomeById() {
        Long id = 1L;
        service.getLearningOutcomeById(id);
        verify(learningOutcomeMapper).findById(id);
    }

    @Test
    public void testUpdateOutcomes() {
        List<SessionOutcomeDTO> outcomes = Arrays.asList(new SessionOutcomeDTO(), new SessionOutcomeDTO());
        service.updateOutcomes(outcomes);
        outcomes.forEach(outcome -> verify(learningOutcomeMapper).updateOutcome(outcome));
    }

    @Test
    public void testSaveLearningOutcome() {
        LearningOutcomeDTO outcomeDTO = new LearningOutcomeDTO();
        outcomeDTO.setContent("Content");
        outcomeDTO.setActivityId(1L);

        LearningOutcome outcome = new LearningOutcome();
        outcome.setContent(outcomeDTO.getContent());
        outcome.setActivityId(outcomeDTO.getActivityId());

        service.saveLearningOutcome(outcomeDTO);

        verify(learningOutcomeMapper).insertLearningOutcome(any(LearningOutcome.class));
    }

    @Test
    public void testBatchUpdateContents() {
        LearningOutcome outcome1 = new LearningOutcome();
        outcome1.setId(1L);
        outcome1.setContent("Content1");
        outcome1.setActivityId(1L);

        LearningOutcome outcome2 = new LearningOutcome();
        outcome2.setId(2L);
        outcome2.setContent("Content2");
        outcome2.setActivityId(2L);

        List<LearningOutcome> learningOutcomes = Arrays.asList(outcome1, outcome2);

        service.batchUpdateContents(learningOutcomes);

        for (LearningOutcome outcome : learningOutcomes) {
            verify(learningOutcomeMapper).updateContent(outcome.getId(), outcome.getContent());
        }
    }
}
