package com.example.mybaitsplusdemo.Service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.mybaitsplusdemo.RequestBody.UserWithAttributesDTO;
import com.example.mybaitsplusdemo.entity.Attribute;
import com.example.mybaitsplusdemo.entity.Users;
import com.example.mybaitsplusdemo.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;


    // valid user
    public Users validateUser(String username, String password) {
        Users user = userMapper.findByUsername(username);
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        return null;
    }

    public Users findByUsername(String username) {
        return userMapper.findByUsername(username);
    }

    public void saveUser(Users user) {
        userMapper.save(user);
    }


    public List<Users> getAllUsers() {
        return userMapper.selectList(null);
    }

    public boolean addUser(Users user) {
        return userMapper.insert(user) > 0;
    }

    public List<Users> getAllUsersAndTheirOrders() {
        return userMapper.selectAllUserAndOrders();
    }

    public List<Users> getUsersByName(String username) {
        QueryWrapper<Users> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        return userMapper.selectList(queryWrapper);
    }

    public IPage<Users> getUsersByPage(int pageNumber, int pageSize) {
        Page<Users> page = new Page<>(pageNumber, pageSize);
        return userMapper.selectPage(page, null);
    }

    public String findAvatarById(int id){
        return userMapper.findAvatarById(id);
    }

    public UserWithAttributesDTO getUserWithAttributes(int userId) {
        String username = userMapper.findUsernameById(userId);
        List<Attribute> attributes = userMapper.findAttributesByUserId(userId);

        UserWithAttributesDTO dto = new UserWithAttributesDTO();
        dto.setUsername(username);
        dto.setAttributes(attributes);

        return dto;
    }


    public void updateAvatarID(int id, int avatarID) {
        userMapper.updateAvatarID(id, avatarID);
    }


    public String getAvatarPathByUserId(String username) {
        Integer avatarId = userMapper.findAvatarIdByUserId(username);
        if (avatarId != null) {
            return userMapper.findAvatarPathByAvatarId(avatarId);
        } else {

            return "https://www.w3school.com.cn/i/photo/tulip.jpg";
        }
    }

    public Users registerCaseworker(String username, String password) {
        Users caseworker = new Users();
        caseworker.setUsername(username);
        caseworker.setPassword(password);
        caseworker.setRole("caseworker");

        userMapper.registerCaseworker(caseworker);

        return caseworker;
    }

    public void deleteCaseworker(int caseworkerId) {
        // delete specific Caseworker
        userMapper.deleteCaseworker(caseworkerId);
    }

    public String getCaseworkerUsername(int caseworkerId) {
        return userMapper.findCaseworkerUsername(caseworkerId);
    }



}