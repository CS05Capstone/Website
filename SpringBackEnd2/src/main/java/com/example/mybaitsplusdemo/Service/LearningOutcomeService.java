package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.RequestBody.LearningOutcomeDTO;
import com.example.mybaitsplusdemo.RequestBody.LearningOutcomeUpdateDTO;
import com.example.mybaitsplusdemo.RequestBody.SessionOutcomeDTO;
import com.example.mybaitsplusdemo.RequestBody.TipsUpdateDTO;
import com.example.mybaitsplusdemo.entity.LearningOutcome;
import com.example.mybaitsplusdemo.mapper.LearningOutcomeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class LearningOutcomeService {

    @Autowired
    private LearningOutcomeMapper learningOutcomeMapper;

    public LearningOutcome getLearningOutcomeById(Long id) {
        return learningOutcomeMapper.findById(id);
    }

    @Transactional
    public void updateOutcomes(List<SessionOutcomeDTO> outcomes) {
        for(SessionOutcomeDTO outcome : outcomes) {
            learningOutcomeMapper.updateOutcome(outcome);
        }
    }

    @Transactional
    public void saveLearningOutcome(LearningOutcomeDTO outcomeDTO) {
        LearningOutcome outcome = new LearningOutcome();
        outcome.setContent(outcomeDTO.getContent());
        outcome.setActivityId(outcomeDTO.getActivityId());

        learningOutcomeMapper.insertLearningOutcome(outcome);
    }

    public void batchUpdateContents(List<LearningOutcome> learningOutcomes) {
        for (LearningOutcome outcome : learningOutcomes) {
            learningOutcomeMapper.updateContent(outcome.getId(), outcome.getContent());
        }
    }

    public void batchUpdateLearningOutcomes(Long activityId, List<LearningOutcomeUpdateDTO> LearningOutcomeDTOs) {
        List<Long> outcomeIds = learningOutcomeMapper.findOutcomeIdsByActivityId(activityId);
        int i = 0;
        for (LearningOutcomeUpdateDTO updateDTO : LearningOutcomeDTOs) {
            learningOutcomeMapper.updateContentByIdAndActivityId(outcomeIds.get(i), activityId, updateDTO.getContent());
            i++;
        }
    }

}