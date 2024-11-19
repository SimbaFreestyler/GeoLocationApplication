package pl.polsl.geoapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.geoapp.dto.user.UserDriverRequest;
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
    public ResponseEntity<UserResponse> register(@RequestBody UserDriverRequest request) {
        return new ResponseEntity<>(userService.register(request), HttpStatus.ACCEPTED);
    }
}
