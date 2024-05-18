package com.example.mybaitsplusdemo.Service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.mybaitsplusdemo.RequestBody.UserWithAttributesDTO;
import com.example.mybaitsplusdemo.entity.Attribute;
import com.example.mybaitsplusdemo.entity.Users;
import com.example.mybaitsplusdemo.mapper.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void validateUser_validCredentials() {
        String username = "testUsername";
        String password = "testPassword";

        Users mockUser = new Users();
        mockUser.setUsername(username);
        mockUser.setPassword(password);

        when(userMapper.findByUsername(username)).thenReturn(mockUser);

        Users result = userService.validateUser(username, password);

        assertNotNull(result);
        assertEquals(username, result.getUsername());
    }

    @Test
    void validateUser_invalidCredentials() {
        String username = "testUsername";
        String password = "wrongPassword";

        Users mockUser = new Users();
        mockUser.setUsername(username);
        mockUser.setPassword("testPassword");

        when(userMapper.findByUsername(username)).thenReturn(mockUser);

        Users result = userService.validateUser(username, password);

        assertNull(result);
    }

    @Test
    void findByUsername() {
        String username = "testUsername";
        Users mockUser = new Users();
        mockUser.setUsername(username);

        when(userMapper.findByUsername(username)).thenReturn(mockUser);

        Users result = userService.findByUsername(username);

        assertNotNull(result);
        assertEquals(username, result.getUsername());
    }

    @Test
    void saveUser() {
        Users mockUser = new Users();
        mockUser.setUsername("testUsername");
        mockUser.setPassword("testPassword");

        doNothing().when(userMapper).save(mockUser);

        userService.saveUser(mockUser);

        verify(userMapper, times(1)).save(mockUser);
    }

    @Test
    void getAllUsers() {
        List<Users> mockUsers = Arrays.asList(new Users(), new Users());

        when(userMapper.selectList(null)).thenReturn(mockUsers);

        List<Users> result = userService.getAllUsers();

        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    void addUser() {
        Users mockUser = new Users();
        mockUser.setUsername("testUsername");
        mockUser.setPassword("testPassword");

        when(userMapper.insert(mockUser)).thenReturn(1);

        boolean result = userService.addUser(mockUser);

        assertTrue(result);
    }

    @Test
    void getUsersByName() {
        String username = "testUsername";
        List<Users> mockUsers = Arrays.asList(new Users(), new Users());

        when(userMapper.selectList(any(QueryWrapper.class))).thenReturn(mockUsers);

        List<Users> result = userService.getUsersByName(username);

        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    void getUsersByPage() {
        int pageNumber = 1;
        int pageSize = 10;
        IPage<Users> mockPage = new Page<>();

        when(userMapper.selectPage(any(Page.class), eq(null))).thenReturn((Page) mockPage);

        IPage<Users> result = userService.getUsersByPage(pageNumber, pageSize);

        assertNotNull(result);
    }

    @Test
    void findAvatarById() {
        int id = 123;
        String avatar = "avatar.png";

        when(userMapper.findAvatarById(id)).thenReturn(avatar);

        String result = userService.findAvatarById(id);

        assertNotNull(result);
        assertEquals(avatar, result);
    }

    @Test
    void getUserWithAttributes() {
        int userId = 123;
        String username = "testUsername";
        List<Attribute> attributes = Arrays.asList(new Attribute(), new Attribute());

        when(userMapper.findUsernameById(userId)).thenReturn(username);
        when(userMapper.findAttributesByUserId(userId)).thenReturn(attributes);

        UserWithAttributesDTO result = userService.getUserWithAttributes(userId);

        assertNotNull(result);
        assertEquals(username, result.getUsername());
        assertEquals(2, result.getAttributes().size());
    }
}


