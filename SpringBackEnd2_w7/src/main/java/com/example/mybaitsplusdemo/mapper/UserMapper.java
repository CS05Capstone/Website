package com.example.mybaitsplusdemo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.mybaitsplusdemo.entity.Attribute;
import com.example.mybaitsplusdemo.entity.Users;
import org.apache.ibatis.annotations.*;

import java.util.List;

//Discovered by @MapperScan, this UserMapper
@Mapper
public interface UserMapper extends BaseMapper<Users> { //MyBatis Plus will automatically perform CRUD operations on the User table based on the User class
    //The following is what you need to write for MyBatis, but for MyBatis Plus, you only need to extend BaseMapper
//    //Query all users
//    @Select("select * from user") //Automatically locate the configuration file for the 'mydb' database and automatically place it into a List
//    public List<User> find();
//
    //insert can automatically match the variables in the User class, but the names must be the same. If an int type value is empty, it will be automatically set to 0
    @Insert("insert into users values(#{id},#{username},#{password})")
    public int insert(Users user);
//    //return type means insert how many

    //Retrieve user by ID
    @Select("select * from users where id = #{id}")
    Users selectById(int id);

    //Retrieve users and all orders
    @Select("select * from users")
    @Results(
            {
                    //Assign a value to each field, where 'column' corresponds to the fields in the table, and 'property' refers to the fields in the class
                    @Result(column = "id", property = "id"),
                    @Result(column = "username", property = "username"),
                    @Result(column = "password", property = "password"),
                    //map orders by id
//                    @Result(column = "id", property = "orders",javaType = List.class,
//                            many = @Many(select = "com.example.mybaitsplusdemo.mapper.OrderMapper.selectByUid")
//                    )
            }
    )
    List<Users> selectAllUserAndOrders();

    @Select("SELECT * FROM users WHERE username = #{username}")
    Users findByUsername(String username);

    @Select("INSERT INTO users (username, password) VALUES (#{username}, #{password})")
    void save(Users user);

    @Select("SELECT path FROM avatar WHERE id = #{id}")
    String findAvatarById(int id);


    @Select("SELECT username FROM users WHERE id = #{userId}")
    String findUsernameById(@Param("userId") int userId);

    @Select("SELECT a.* FROM Attribute a " +
            "JOIN user_attributes ua ON a.id = ua.attribute_id " +
            "WHERE ua.user_id = #{userId}")
    List<Attribute> findAttributesByUserId(@Param("userId") int userId);

    @Update("UPDATE users SET avatarID = #{avatarID} WHERE id = #{id}")
    void updateAvatarID(@Param("id") int id, @Param("avatarID") int avatarID);

    @Select("SELECT avatarID FROM users WHERE username = #{username}")
    Integer findAvatarIdByUserId(String username);

    @Select("SELECT path FROM avatar WHERE id = #{avatarId}")
    String findAvatarPathByAvatarId(int avatarId);


    @Select("SELECT username FROM users WHERE id = #{caseworkerId} AND role = 'caseworker'")
    String findCaseworkerUsername(int caseworkerId);
    @Delete("DELETE FROM users WHERE id = #{caseworkerId} AND role = 'caseworker'")
    void deleteCaseworker(int caseworkerId);


    @Insert("INSERT INTO users (username, password, role) VALUES (#{username}, #{password}, 'caseworker')")
    void registerCaseworker(Users caseworker);

}
