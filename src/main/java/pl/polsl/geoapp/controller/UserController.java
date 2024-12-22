package pl.polsl.geoapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.geoapp.dto.user.UserRequest;
import pl.polsl.geoapp.dto.user.UserResponse;
import pl.polsl.geoapp.service.UserService;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserRequest request) {
        return new ResponseEntity<>(userService.login(request), HttpStatus.ACCEPTED);
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest request) {
        return new ResponseEntity<>(userService.register(request), HttpStatus.ACCEPTED);
    }

    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUser(Authentication auth) {
        UserResponse user = (UserResponse) auth.getPrincipal();
        return ResponseEntity.ok(userService.findByEmail(user.getEmail()));
    }
}
