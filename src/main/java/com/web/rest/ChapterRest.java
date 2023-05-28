package com.web.rest;

import com.web.entity.Category;
import com.web.entity.Chapter;
import com.web.entity.Comic;
import com.web.repository.ChapterRepository;
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
public class ChapterRest {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private ComicRepository comicRepository;

    @PostMapping("/admin/addChapter")
    public void save(@RequestBody Chapter chapter){
        chapter.setCreatedDate(new Date(System.currentTimeMillis()));
        if(chapter.getId() == null){
            Comic c =comicRepository.findById(chapter.getComic().getId()).get();
            c.setNumchap(c.getNumchap() + 1);
            comicRepository.save(c);
        }
        chapterRepository.save(chapter);
    }

    @GetMapping("/public/chapterByComic")
    public List<Chapter> findAll(@RequestParam(value = "id", required = false) Long idcomic){
        if(idcomic == null){
            return chapterRepository.findAll();
        }
        return chapterRepository.findByComic(idcomic);
    }

    @GetMapping("/public/chapterByComicPage")
    public Page<Chapter> findAllPage(@RequestParam(value = "id") Long idcomic, Pageable pageable){
        return chapterRepository.findByComicPage(idcomic, pageable);
    }

    @GetMapping("/public/chapterById")
    public Chapter findById(@RequestParam("id") Long id){
        return chapterRepository.findById(id).get();
    }

    @GetMapping("/public/preOrNextChap")
    public Chapter preOrNext(@RequestParam("id") Long id, @RequestParam("type") Integer type){
        Chapter c = chapterRepository.findById(id).get();
       if(type == 0){
           return chapterRepository.nextChap(id, c.getComic().getId());
       }
       else{
           return chapterRepository.preChap(id, c.getComic().getId());
       }
    }

    @DeleteMapping("/admin/deleteChap")
    public void deleteCategory(@RequestParam("id") Long id){
        Chapter chapter = chapterRepository.findById(id).get();
        Comic c =comicRepository.findById(chapter.getComic().getId()).get();
        c.setNumchap(c.getNumchap() - 1);
        comicRepository.save(c);
        chapterRepository.deleteById(id);
    }
}
