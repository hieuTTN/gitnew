package com.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "chapter")
@Getter
@Setter
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    private Date createdDate;

    private String content;

    @ManyToOne
    @JoinColumn(name = "comic_id")
    private Comic comic;
}
