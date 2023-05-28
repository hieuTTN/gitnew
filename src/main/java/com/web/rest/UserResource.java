package com.web.rest;

import com.web.dto.CustomUserDetails;
import com.web.entity.User;
import com.web.jwt.JwtTokenProvider;
import com.web.repository.UserRepository;
import com.web.service.MailService;
import com.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserResource {
    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    private final MailService mailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResource(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, UserService userService, MailService mailService) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.mailService = mailService;
    }
    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody User user) throws URISyntaxException {
        Optional<User> users = userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        System.out.println(users);
        if(users.isPresent() == false){
            return ResponseEntity.status(401)
                    .body(null);
        }
        CustomUserDetails customUserDetails = new CustomUserDetails(users.get());
        String token = jwtTokenProvider.generateToken(customUserDetails);
        return ResponseEntity
                .created(new URI("/api/authen/" ))
                .body(token);
    }

    @PostMapping("/register")
    public ResponseEntity<Integer> save(@RequestBody User user) throws URISyntaxException {
        if(userRepository.getUserByUserName(user.getUsername()).isPresent()){
            HttpHeaders headers = new HttpHeaders();
            headers.add("username already exist ", user.getUsername());
            return ResponseEntity.status(300).headers(headers)
                    .body(1);
        }
        User result = userService.save(user);
        System.out.println(result);
        return ResponseEntity
                .created(new URI("/api/save/" + result.getId()))
                .body(0);
    }


    @PostMapping("/userlogged")
    public User getUserLogged(){
        return userService.getUserWithAuthority();
    }


    @PostMapping("/resetpass")
    public ResponseEntity<String> resetPassword(@RequestBody String email) throws URISyntaxException {
        Optional<User> user = userRepository.getUserByEmail(email);
        if(user.isPresent() == false){
            return ResponseEntity.status(500)
                    .body("this email not exist");
        }
        else{
            String newPass = userService.randomPass();
            User users = user.get();
            users.setPassword(passwordEncoder.encode(newPass));
            userRepository.save(users);
            mailService.sendEmail(email,"Mật khẩu mới của bạn","Mật khẩu mới của bạn là: "+newPass,false, false);
        }
        return ResponseEntity.status(200)
                .body("check your email");
    }

    @GetMapping("/admin/getUserNotAdmin")
    public List<User> getUserNotAdmin() {
        return userRepository.findUserNotAdmin("ROLE_ADMIN");
    }

    @PostMapping("/admin/activeUser")
    public void activeOrUnactiveUser(@RequestParam("id") Long id){
        User user = userRepository.findById(id).get();
        if(user.getActived() == 1){
            user.setActived(0);
        }
        else{
            user.setActived(1);
        }
        userRepository.save(user);
    }

    @GetMapping("/admin/getUserNotUser")
    public List<User> getUserNotUser() {
        return userRepository.findUserNotAdmin("ROLE_USER");
    }

    @GetMapping("/admin/getUserNotAdminByDate")
    public List<User> getUserNotAdminByDate(@RequestParam("d1") Date d1, @RequestParam("d2") Date d2) {
        System.out.println("d1: "+d1);
        System.out.println("d2: "+d2);
        return userRepository.findUserNotAdminAndDate("ROLE_ADMIN", d1, d2);
    }


    @GetMapping("/public/findUserNotDtoById")
    public User findUserById(@RequestParam("id") Long id) {
        return userRepository.findById(id).get();
    }

    @GetMapping("/admin/checkroleAdmin")
    public void checkroleAdmin(){
        System.out.println("admin");
    }

    @GetMapping("/user/checkroleUser")
    public void checkroleUser(){
        System.out.println("user");
    }
}
