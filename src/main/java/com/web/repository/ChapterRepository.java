package com.web.repository;

import com.web.entity.Category;
import com.web.entity.Chapter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    @Query("select c from Chapter c where c.comic.id = ?1 order by c.id desc ")
    public List<Chapter> findByComic(Long comicId);

    @Query("select c from Chapter c where c.comic.id = ?1")
    public Page<Chapter> findByComicPage(Long comicId, Pageable pageable);

    @Query(value = "select c.* from Chapter c where c.comic_id = ?2 and c.id > ?1 order by c.id desc limit 1", nativeQuery = true)
    public Chapter nextChap(Long chapId, Long comicId);

    @Query(value = "select c.* from Chapter c where c.comic_id = ?2 and c.id < ?1 order by c.id asc limit 1", nativeQuery = true)
    public Chapter preChap(Long chapId, Long comicId);
}
