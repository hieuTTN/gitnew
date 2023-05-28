package com.web.repository;

import com.web.entity.Category;
import com.web.entity.Comic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComicRepository extends JpaRepository<Comic, Long> {

    // lay tat ca truyen, sap xep truyen theo thu tu moi nhat
    @Query("select c from Comic c order by c.id desc ")
    public Page<Comic> findPage(Pageable pageable);

    @Query("select c from Comic c where c.category.id = ?1 order by c.id desc")
    public Page<Comic> findPageCate(Long idCate, Pageable pageable);

    // tim kiem truyen tren thanh tim kiem
    @Query("select c from Comic c where c.category.name like ?1 or c.authors like ?1 or c.name like ?1 order by c.id desc")
    public Page<Comic> findPageParam(String param, Pageable pageable);


    // lay cac truyen lien quan
    @Query(value = "select c.* from Comic c where c.category_id = ?1 and c.id != ?2 limit 15", nativeQuery = true)
    public List<Comic> lienquan(Long idCate, Long comicId);

    // loc truyen theo danh muc
    @Query(value = "select c.* from Comic c where c.category_id = ?1", nativeQuery = true)
    public List<Comic> findByCate(Long idCate);

    @Query("select c from Comic c where c.chonLoc = 1 order by c.id desc")
    public Page<Comic> truyenchonloc(Pageable pageable);
}
