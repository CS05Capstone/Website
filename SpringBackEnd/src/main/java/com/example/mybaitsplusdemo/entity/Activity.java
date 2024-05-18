package com.example.mybaitsplusdemo.entity;

import javax.persistence.*;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "tips")
    private String tips;

    @Column(name = "outcome")
    private String outcome;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    public Long getModule_id_1() {
        return module_id_1;
    }

    public void setModuleId1(Long module_id_1) {
        this.module_id_1 = module_id_1;
    }

    @Column(name = "module_id_1")
    private Long module_id_1;

    public Activity() {}

    public Activity(String name, Module module) {
        this.name = name;
        this.module = module;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }
    @Column(name = "introduction")
    private String introduction;

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }



    public String getTips() {
        return tips;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }
}