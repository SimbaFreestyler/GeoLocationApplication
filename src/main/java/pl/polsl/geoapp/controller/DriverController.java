package pl.polsl.geoapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.geoapp.dto.driver.DriverResponse;
import pl.polsl.geoapp.dto.user.UserResponse;
import pl.polsl.geoapp.service.DriverService;

@RestController
@RequestMapping("/driver")
public class DriverController {
    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping("")
    public ResponseEntity<DriverResponse> getDriver(Authentication auth) {
        UserResponse user = (UserResponse) auth.getPrincipal();
        return ResponseEntity.ok(driverService.getDriver(user.getEmail()));
    }
}
