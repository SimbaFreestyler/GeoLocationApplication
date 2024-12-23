package pl.polsl.geoapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.polsl.geoapp.dto.BasicResponse;
import pl.polsl.geoapp.dto.driver.DriverRequest;
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

    @PostMapping("")
    public ResponseEntity<DriverResponse> createDriver(@RequestBody DriverRequest request, Authentication auth) {
        UserResponse user = (UserResponse) auth.getPrincipal();
        return new ResponseEntity<>(driverService.createDriver(request, user.getEmail()), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<DriverResponse[]> getDrivers(Authentication auth) {
        UserResponse user = (UserResponse) auth.getPrincipal();
        return ResponseEntity.ok(driverService.getDrivers(user.getEmail()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BasicResponse> deleteDriver(@PathVariable Integer id) {
        return ResponseEntity.ok(driverService.deleteDriver(id));
    }
}
