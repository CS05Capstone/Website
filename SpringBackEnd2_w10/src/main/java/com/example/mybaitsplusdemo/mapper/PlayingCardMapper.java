package com.example.mybaitsplusdemo.mapper;

import com.example.mybaitsplusdemo.entity.PlayingCard;
import org.apache.ibatis.annotations.*;

@Mapper
public interface PlayingCardMapper {
    // query by id
    @Select("SELECT * FROM playing_cards WHERE id = #{id}")
    PlayingCard findById(@Param("id") Long id);

    // insert new playing card
    @Insert("INSERT INTO playing_cards(user_id, attributes1, attributes2, avatarPath) VALUES(#{userId}, #{attributes1}, #{attributes2},  #{avatarPath})")

    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(PlayingCard card);

    // update playing card
    @Update("UPDATE playing_cards SET user_id = #{userId}, attributes1 = #{attributes1}, attributes2 = #{attributes2}, avatarPath = #{avatarPath} WHERE id = #{id}")
    int update(PlayingCard card);

    // delete playing card
    @Delete("DELETE FROM playing_cards WHERE id = #{id}")
    int delete(Long id);

}