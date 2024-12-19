package pl.polsl.geoapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.geoapp.dto.VehicleTrackerRequest;
import pl.polsl.geoapp.dto.VehicleTrackerResponse;
import pl.polsl.geoapp.dto.vehicle.VehicleRequest;
import pl.polsl.geoapp.dto.vehicle.VehicleResponse;
import pl.polsl.geoapp.service.VehicleService;

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

    @PostMapping("/tracker")
    public ResponseEntity<VehicleTrackerResponse> createVehicleTracker(@RequestBody VehicleTrackerRequest request) {
        return new ResponseEntity<>(vehicleService.createVehicleTracker(request), HttpStatus.CREATED);
    }

    @GetMapping("/tracker")
    public ResponseEntity<VehicleTrackerResponse[]> getVehicleTrackers() {
        return ResponseEntity.ok(vehicleService.getVehicleTrackers());
    }
}
