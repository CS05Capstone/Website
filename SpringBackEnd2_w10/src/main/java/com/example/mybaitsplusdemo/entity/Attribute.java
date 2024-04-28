package com.example.mybaitsplusdemo.entity;



import javax.persistence.*;

@Entity
@Table(name = "Attribute")
public class Attribute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "AName")
    private String AName;

    @Column(name = "Value")
    private int value;

    @Column(name = "image")
    private String image;

    // 构造函数
    public Attribute() {
    }

    public Attribute(String name, int value, String image) {
        this.AName = name;
        this.value = value;
        this.image = image;
    }

    // Getter and Setter 方法

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return AName;
    }

    public void setName(String name) {
        this.AName = name;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Attribute{" +
                "id=" + id +
                ", name='" + AName + '\'' +
                ", value=" + value +
                ", image='" + image + '\'' +
                '}';
    }
}
