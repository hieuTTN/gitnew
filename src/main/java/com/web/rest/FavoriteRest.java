package com.web.rest;

import com.web.entity.Category;
import com.web.entity.Favorite;
import com.web.entity.User;
import com.web.repository.FavoriteRepository;
import com.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class FavoriteRest {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/user/addFavorite")
    public void save(@RequestBody Favorite favorite){
        User user = userService.getUserWithAuthority();
        if(favoriteRepository.findByUserAndComic(user.getId(), favorite.getComic().getId()) != null){
            return;
        }
        favorite.setUser(user);
        favoriteRepository.save(favorite);
    }

    @GetMapping("/user/myfavorite")
    public List<Favorite> findAll(){
        return favoriteRepository.findByUser(userService.getUserWithAuthority().getId());
    }

    @DeleteMapping("/user/deletefavorite")
    public void deleteCategory(@RequestParam("id") Long id){
        favoriteRepository.deleteById(id);
    }
}
