package com.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AdminController {


    @RequestMapping(value = "/admin/addcategory", method = RequestMethod.GET)
    public String addcategory(){
        return "admin/addcategory";
    }

    @RequestMapping(value = "/admin/addchapter", method = RequestMethod.GET)
    public String addchapter(){
        return "admin/addchapter";
    }

    @RequestMapping(value = "/admin/addcomic", method = RequestMethod.GET)
    public String addcomic(){
        return "admin/addcomic";
    }

    @RequestMapping(value = "/admin/category", method = RequestMethod.GET)
    public String category(){
        return "admin/category";
    }

    @RequestMapping(value = "/admin/chapter", method = RequestMethod.GET)
    public String chapter(){
        return "admin/chapter";
    }

    @RequestMapping(value = "/admin/comic", method = RequestMethod.GET)
    public String comic(){
        return "admin/comic";
    }

    @RequestMapping(value = "/admin/user", method = RequestMethod.GET)
    public String user(){
        return "admin/user";
    }
}
