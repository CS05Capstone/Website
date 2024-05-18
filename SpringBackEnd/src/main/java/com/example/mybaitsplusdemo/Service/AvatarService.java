package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.Avatar;
import com.example.mybaitsplusdemo.mapper.AvatarMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AvatarService {

    @Autowired
    private AvatarMapper avatarMapper;

    public Avatar getAvatarById(int id) {
        return avatarMapper.findById(id);
    }

    public void saveAvatar(Avatar avatar) {
        avatarMapper.insert(avatar);
    }

}