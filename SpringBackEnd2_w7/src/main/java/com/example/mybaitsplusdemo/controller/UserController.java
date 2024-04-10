package com.example.mybaitsplusdemo.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.mybaitsplusdemo.RequestBody.LoginRequest;
import com.example.mybaitsplusdemo.RequestBody.RegisterRequest;
import com.example.mybaitsplusdemo.RequestBody.UserWithAttributesDTO;
import com.example.mybaitsplusdemo.entity.TokenResponse;
import com.example.mybaitsplusdemo.Service.UserService;
import com.example.mybaitsplusdemo.entity.Users;
import com.example.mybaitsplusdemo.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin //You can perform CORS measures to this class. Creating the CORSCONFIG if you want to make it global
public class UserController {

    //We want to obtain an instance of UserMapper and inject it into the variable userMapper using the @Autowired annotation.
    // 
    @Autowired
//    private UserMapper userMapper;
    private UserService userService = new UserService();

    //When you go to localhost:8080/user, it will trigger the SQL query in the find method of userMapper and store the result in 'ls'.
//    @GetMapping("/user")
//    public List query(){
//        List<Users> ls = userMapper.selectList(null);//null means everything
//        System.out.println(ls);
//        //return json format of data
//        return ls;
//    }
//
//
//
//    @GetMapping("/hello")
//    public String sayHi(){
//        return "His";
//    }
//
//    //Insert a user value received based on the insert method.
//    @PostMapping("/user")
//    public String save(@RequestBody Users users){
//        System.out.println(users.toString());
//        int i = userMapper.insert(users);
//        if(i > 0){
//            return "Insert success";
//        }else{
//            return "Insert failed";
//        }
////        return "123";
//    }
//
//    @GetMapping("/user/findAll")
//    public List<Users> find(){
//        return userMapper.selectAllUserAndOrders();
//    }
//
//    @GetMapping("/user/find")
//    public List<Users> findByCond(){
//        QueryWrapper<Users> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("username","doki");
//        return userMapper.selectList(queryWrapper);
//    }
//
//    //pagination query
//    @GetMapping("/findByPage")
//    public IPage<Users> findByPage(
//            @RequestParam(defaultValue = "0") int pageNumber,
//            @RequestParam(defaultValue = "2") int pageSize) {
//
//        return userService.getUsersByPage(pageNumber, pageSize);
//    }
//    @GetMapping("/user/findByPage")
//    public IPage findByPage(){
//        //Set the starting value and the number of items per page
//        Page<Users> page = new Page<>(0,2);//from 0 to 2
//        //Encapsulate the result into an iPage
//        IPage iPage = userMapper.selectPage(page,null);
//        return iPage;
//    }

    @GetMapping("/user")
    public List<Users> getAllUsers() {
        System.out.println("useruser");
        return userService.getAllUsers();
    }

    @PostMapping("/user")
    public String addUser(@RequestBody Users user) {
        boolean success = userService.addUser(user);
        return success ? "Insert Success" : "Insert failed";
    }

    @GetMapping("/user/findAll")
    public List<Users> getAllUsersAndTheirOrders() {
        return userService.getAllUsersAndTheirOrders();
    }

    @GetMapping("/user/find")
    public List<Users> getUsersByName() {
        return userService.getUsersByName("doki");
    }

    @GetMapping("/hello")
    public String sayHi() {
        return "His";
    }
    @GetMapping("user/findByPage")
    public IPage<Users> findByPage(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "2") int pageSize) {

        return userService.getUsersByPage(pageNumber, pageSize);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Users user = userService.validateUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            JwtUtil jwtUtil = new JwtUtil();
            String jwt = jwtUtil.generateToken(user);
            return ResponseEntity.ok(new TokenResponse(jwt));
        }


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        Users existingUser = userService.findByUsername(registerRequest.getUsername());

        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken");
        }

        Users newUser = new Users();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setPassword(registerRequest.getPassword());
        userService.saveUser(newUser);

        JwtUtil jwtUtil = new JwtUtil();
        String token = jwtUtil.generateToken(newUser);

        return ResponseEntity.ok(new TokenResponse(token));
    }

    @CrossOrigin(origins = "http://localhost:7070")
    @GetMapping("/findAvatar/{id}")
    public ResponseEntity<String> findAvatar(@PathVariable int id){
        String path = userService.findAvatarById(id);
        if(path == null){
            return  ResponseEntity.ok("https://www.w3school.com.cn/i/photo/tulip.jpg");
        }
        return ResponseEntity.ok(path);
    }


    @GetMapping("/user/{userId}/attributes")
    public ResponseEntity<UserWithAttributesDTO> getUserWithAttributes(@PathVariable int userId) {
        UserWithAttributesDTO dto = userService.getUserWithAttributes(userId);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @CrossOrigin(origins = "http://localhost:7070")
    @PutMapping("/updateAvatar")
    public void updateAvatarID(@RequestParam("id") int id, @RequestParam("avatarID") int avatarID) {
        userService.updateAvatarID(id, avatarID);
    }

    @GetMapping("/avatar/{userId}")

    public ResponseEntity<String> getAvatarPathByUserId(@PathVariable String userId) {
        String avatarPath = userService.getAvatarPathByUserId(String.valueOf(userId));

        return ResponseEntity.ok(avatarPath);
    }


    @PostMapping("caseworker/register")
    public ResponseEntity<Users> registerCaseworker(
            @RequestParam String username,
            @RequestParam String password
    ) {
        Users caseworker = userService.registerCaseworker(username, password);
        return ResponseEntity.ok(caseworker);
    }

    @DeleteMapping("delete/caseworker/{caseworkerId}")
    public ResponseEntity<String> deleteCaseworker(
            @PathVariable int caseworkerId
    ) {
        userService.deleteCaseworker(caseworkerId);
        return ResponseEntity.ok("Caseworker deleted successfully.");
    }

    @GetMapping("/{caseworkerId}/username")
    public ResponseEntity<String> getCaseworkerPassword(
            @PathVariable int caseworkerId
    ) {
        String username = userService.getCaseworkerUsername(caseworkerId);
        if (username != null) {
            return ResponseEntity.ok(username);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
