package com.example.mybaitsplusdemo.Service;


import com.example.mybaitsplusdemo.RequestBody.TipsUpdateDTO;
import com.example.mybaitsplusdemo.entity.Tips;
import com.example.mybaitsplusdemo.mapper.TipsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipsService {

    private final TipsMapper tipsMapper;

    @Autowired
    public TipsService(TipsMapper tipsMapper) {
        this.tipsMapper = tipsMapper;
    }

    public Tips createTips(Tips tips) {
        tipsMapper.insert(tips);
        return tips;
    }

    public void batchUpdateTips(Long activityId, List<TipsUpdateDTO> tipsUpdateDTOS) {
        List<Long> tipIds = tipsMapper.findTipIdsByActivityId(activityId);
        int i = 0;
        for (TipsUpdateDTO updateDTO : tipsUpdateDTOS) {
            tipsMapper.updateContentByIdAndActivityId(tipIds.get(i), activityId, updateDTO.getContent());
            i++;
        }
    }
}