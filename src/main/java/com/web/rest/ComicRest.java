package com.web.rest;

import com.web.entity.Category;
import com.web.entity.Comic;
import com.web.repository.ComicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ComicRest {

    @Autowired
    private ComicRepository comicRepository;


    @PostMapping("/admin/addComic")
    public void save(@RequestBody Comic comic){
        if(comic.getId() == null){
            comic.setFulles(0);
            comic.setNumView(0);
            comic.setNumchap(0);
            comic.setCreatedDate(new Date(System.currentTimeMillis()));
        }
        else{
            Comic c = comicRepository.findById(comic.getId()).get();
            comic.setFulles(c.getFulles());
            comic.setNumView(c.getNumView());
            comic.setCreatedDate(c.getCreatedDate());
            comic.setNumchap(c.getNumchap());
        }
        comicRepository.save(comic);
    }

    @GetMapping("/public/allcomic")
    public List<Comic> findAll(@RequestParam(value = "id", required = false) Long idcate){
        if(idcate == null){
            return comicRepository.findAll();
        }
        return comicRepository.findByCate(idcate);
    }

    @GetMapping("/public/allcomicpage")
    public Page<Comic> findAll(@RequestParam(value = "id", required = false) Long cateId,
           @RequestParam(value = "search", required = false) String param , Pageable pageable){
            Page<Comic> page = null;
            if(cateId == null && param == null){
                page = comicRepository.findPage(pageable);
            }
            if(cateId != null){
                page = comicRepository.findPageCate(cateId, pageable);
            }
            if(param != null){
                page = comicRepository.findPageParam("%"+param+"%",pageable);
            }
            return page;
    }

    @GetMapping("/public/truyenchonloc")
    public Page<Comic> findAll(Pageable pageable){
        Page<Comic> page = null;
        page = comicRepository.truyenchonloc(pageable);
        return page;
    }

    @GetMapping("/public/comiclienquan")
    public List<Comic> findLienQuan(@RequestParam(value = "id") Long id){
        Comic c = comicRepository.findById(id).get();
        return comicRepository.lienquan(c.getCategory().getId(), id);
    }

    @GetMapping("/public/comicById")
    public Comic findById(@RequestParam("id") Long id){
        return comicRepository.findById(id).get();
    }

    @GetMapping("/public/comicByIdView")
    public Comic findByIdUser(@RequestParam("id") Long id){
        Comic c = comicRepository.findById(id).get();
        c.setNumView(c.getNumView() + 1);
        comicRepository.save(c);
        return c;
    }

    @DeleteMapping("/admin/deleteComic")
    public void deleteCategory(@RequestParam("id") Long id){
        comicRepository.deleteById(id);
    }
}
