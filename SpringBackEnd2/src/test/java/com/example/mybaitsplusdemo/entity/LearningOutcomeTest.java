package com.example.mybaitsplusdemo.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class LearningOutcomeTest {

    private LearningOutcome learningOutcome;

    @BeforeEach
    public void setUp() {
        learningOutcome = new LearningOutcome();
    }

    @Test
    public void testIdGetterAndSetter() {
        Long id = 123L;
        learningOutcome.setId(id);
        assertEquals(id, learningOutcome.getId());
    }

    @Test
    public void testContentGetterAndSetter() {
        String content = "Expected Outcome";
        learningOutcome.setContent(content);
        assertEquals(content, learningOutcome.getContent());
    }

//    @Test
//    public void testActivityGetterAndSetter() {
//        Activity activity = new Activity();
//        // Here, you can set attributes of the activity if needed
//        learningOutcome.setActivity(activity);
//        assertEquals(activity, learningOutcome.getActivity());
//    }
//
//    @Test
//    public void testActivityGetter_WhenActivityIsNotSet_ShouldReturnNull() {
//        assertNull(learningOutcome.getActivity());
//    }
}
