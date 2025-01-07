package pl.polsl.geoapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.geoapp.dto.location.LocationResponse;
import pl.polsl.geoapp.service.LocationService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/vehicle/{vehicleId}/{startDate}/{endDate}")
    public ResponseEntity<List<LocationResponse>> getVehicleLocations(@PathVariable String vehicleId,
                                                               @PathVariable LocalDate startDate,
                                                               @PathVariable LocalDate endDate) {
        return ResponseEntity.ok(locationService.getVehicleLocations(vehicleId, startDate, endDate));
    }

    @GetMapping("/driver/{driverId}/{startDate}/{endDate}")
    public ResponseEntity<List<LocationResponse>> getDriverLocations(@PathVariable Integer driverId,
                                                                      @PathVariable LocalDate startDate,
                                                                      @PathVariable LocalDate endDate) {
        return ResponseEntity.ok(locationService.getDriverLocations(driverId, startDate, endDate));
    }
}
