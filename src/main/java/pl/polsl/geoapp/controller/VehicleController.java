package pl.polsl.geoapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.geoapp.dto.*;
import pl.polsl.geoapp.dto.vehicle.VehicleRequest;
import pl.polsl.geoapp.dto.vehicle.VehicleResponse;
import pl.polsl.geoapp.service.VehicleService;

import java.time.LocalDate;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {


    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping("")
    public ResponseEntity<VehicleResponse> createVehicle(@RequestBody VehicleRequest request) {
        return new ResponseEntity<>(vehicleService.createVehicle(request), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<VehicleResponse[]> getVehicles() {
        return ResponseEntity.ok(vehicleService.getVehicles());
    }

    @DeleteMapping("/{registrationNumber}")
    public ResponseEntity<BasicResponse> deleteVehicle(@PathVariable String registrationNumber) {
        return ResponseEntity.ok(vehicleService.deleteVehicle(registrationNumber));
    }

    @PostMapping("/tracker")
    public ResponseEntity<VehicleTrackerResponse> createVehicleTracker(@RequestBody VehicleTrackerRequest request) {
        return new ResponseEntity<>(vehicleService.createVehicleTracker(request), HttpStatus.CREATED);
    }

    @GetMapping("/tracker")
    public ResponseEntity<VehicleTrackerResponse[]> getVehicleTrackers() {
        return ResponseEntity.ok(vehicleService.getVehicleTrackers());
    }

    @DeleteMapping("/tracker/{registrationNumber}/{serialNumber}/{startDate}")
    public ResponseEntity<BasicResponse> deleteVehicleTracker(@PathVariable String registrationNumber,
                                                       @PathVariable String serialNumber,
                                                       @PathVariable LocalDate startDate) {
        return ResponseEntity.ok(vehicleService.deleteVehicleTracker(registrationNumber, serialNumber, startDate));
    }

    @PostMapping("/driver")
    public ResponseEntity<VehicleDriverResponse> createVehicleDriver(@RequestBody VehicleDriverRequest request) {
        return new ResponseEntity<>(vehicleService.createVehicleDriver(request), HttpStatus.CREATED);
    }

    @GetMapping("/driver")
    public ResponseEntity<VehicleDriverResponse[]> getVehicleDrivers() {
        return ResponseEntity.ok(vehicleService.getVehicleDrivers());
    }

    @DeleteMapping("/driver/{registrationNumber}/{driverId}/{startDate}")
    public ResponseEntity<BasicResponse> deleteVehicleDriver(@PathVariable String registrationNumber,
                                                       @PathVariable Integer driverId,
                                                       @PathVariable LocalDate startDate) {
        return ResponseEntity.ok(vehicleService.deleteVehicleDriver(registrationNumber, driverId, startDate));
    }
}
