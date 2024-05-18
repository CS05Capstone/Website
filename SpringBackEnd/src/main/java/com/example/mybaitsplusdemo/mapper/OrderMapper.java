package com.example.mybaitsplusdemo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.mybaitsplusdemo.entity.Order;
import com.example.mybaitsplusdemo.entity.Users;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OrderMapper extends BaseMapper<Order> {
    @Select("select * from orders where uid = #{uid}")
    List<Order> selectByUid(int uid);

    //Retrieve all orders and, at the same time, retrieve the users associated with each order
    @Select("select * from orders")
    @Results(
            {
                    //Assign a value to each field, where 'column' represents the fields in the table, and 'property' represents the fields in the class
                    @Result(column = "id", property = "id"),
                    @Result(column = "order_time", property = "order_time"),
                    @Result(column = "total", property = "total"),
                    @Result(column = "uid", property = "user",javaType = Users.class,
                            one = @One(select = "com.example.mybaitsplusdemo.mapper.UserMapper.selectById")
                    )
            }
    )
    List<Order> selectAllOrdersAndUser();

}
