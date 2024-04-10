package com.example.mybaitsplusdemo.Service;

import com.example.mybaitsplusdemo.entity.Menu;
import com.example.mybaitsplusdemo.entity.MenuAndRoute;
import com.example.mybaitsplusdemo.mapper.MenuMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MenuServiceTest {

    @Mock
    private MenuMapper menuMapper;

    @InjectMocks
    private MenuService menuService;

    private ArrayList<Menu> sampleMenuList;

    @BeforeEach
    public void setup() {
        sampleMenuList = new ArrayList<>();
        Menu menu = new Menu();
        menu.setMenu_id(1);
        menu.setPid(0);
        sampleMenuList.add(menu);
    }

    @Test
    public void testFindAll() {
        when(menuMapper.findAll()).thenReturn(sampleMenuList);

        MenuAndRoute result = menuService.findAll();

        assertNotNull(result);
        verify(menuMapper, times(1)).findAll();
    }

    @Test
    public void testFindByUser() {
        String username = "testUser";
        when(menuMapper.findByUser(username)).thenReturn(sampleMenuList);

        MenuAndRoute result = menuService.findByUser(username);

        assertNotNull(result);
        verify(menuMapper, times(1)).findByUser(username);
    }
}
