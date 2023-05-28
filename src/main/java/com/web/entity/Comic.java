package com.web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comic")
@Getter
@Setter
public class Comic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    private Date createdDate;

    private String banner;

    private Integer numView;

    private String resource;

    private String authors;

    private Integer fulles;

    private String note;

    private Integer numchap;

    private Integer chonLoc;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "comic", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Chapter> chapters = new ArrayList<>();

    @OneToMany(mappedBy = "comic", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Favorite> favorites = new ArrayList<>();
}
