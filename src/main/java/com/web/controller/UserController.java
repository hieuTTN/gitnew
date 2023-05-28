package com.web.controller;

import com.web.entity.User;
import com.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(){
        return "user/index";
    }

    @RequestMapping(value = "/chapter", method = RequestMethod.GET)
    public String chapter(){
        return "user/chapter";
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String detail(){
        return "user/detail";
    }

    @RequestMapping(value = "/favorite", method = RequestMethod.GET)
    public String favorite(){
        return "user/favorite";
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(){
        return "user/index";
    }

    @RequestMapping(value = "/listcomic", method = RequestMethod.GET)
    public String listcomic(){
        return "user/listcomic";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(){
        return "user/login";
    }

    @RequestMapping(value = "/regis", method = RequestMethod.GET)
    public String regis(){
        return "user/regis";
    }
}
