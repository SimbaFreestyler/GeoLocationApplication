package pl.polsl.geoapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.polsl.geoapp.dto.BasicResponse;
import pl.polsl.geoapp.dto.tracker.TrackerRequest;
import pl.polsl.geoapp.dto.tracker.TrackerResponse;
import pl.polsl.geoapp.dto.user.UserResponse;
import pl.polsl.geoapp.service.TrackerService;

@RestController
@RequestMapping("/tracker")
public class TrackerController {
    private final TrackerService trackerService;

    public TrackerController(TrackerService trackerService) {
        this.trackerService = trackerService;
    }

    @PostMapping("")
    public ResponseEntity<TrackerResponse> createTracker(@RequestBody TrackerRequest request) {
        return new ResponseEntity<>(trackerService.createTracker(request), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<TrackerResponse[]> getTrackers(Authentication auth) {
        UserResponse user = (UserResponse) auth.getPrincipal();
        return ResponseEntity.ok(trackerService.getTrackers(user.getEmail()));
    }

    @DeleteMapping("/{serialNumber}")
    public ResponseEntity<BasicResponse> deleteTracker(@PathVariable String serialNumber) {
        return ResponseEntity.ok(trackerService.deleteTracker(serialNumber));
    }

}
