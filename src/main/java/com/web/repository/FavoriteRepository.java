package com.web.repository;

import com.web.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query("select f from Favorite f where f.user.id = ?1 and f.comic.id =?2")
    public Favorite findByUserAndComic(Long userId, Long comicid);

    @Query("select f from Favorite f where f.user.id = ?1 order by f.id desc ")
    public List<Favorite> findByUser(Long userId);
}
