package pl.polsl.geoapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.geoapp.dto.BasicResponse;
import pl.polsl.geoapp.dto.tracker.TrackerRequest;
import pl.polsl.geoapp.dto.tracker.TrackerResponse;
import pl.polsl.geoapp.service.TrackerService;

@RestController
@RequestMapping("")
public class TrackerController {
    private final TrackerService trackerService;

    public TrackerController(TrackerService trackerService) {
        this.trackerService = trackerService;
    }

    @PostMapping("/tracker")
    public ResponseEntity<TrackerResponse> createTracker(@RequestBody TrackerRequest request) {
        return new ResponseEntity<>(trackerService.createTracker(request), HttpStatus.CREATED);
    }

    @GetMapping("/tracker")
    public ResponseEntity<TrackerResponse[]> getTrackers() {
        return ResponseEntity.ok(trackerService.getTrackers());
    }

    @DeleteMapping("tracker/{serialNumber}")
    public ResponseEntity<BasicResponse> deleteTracker(@PathVariable String serialNumber) {
        return ResponseEntity.ok(trackerService.deleteTracker(serialNumber));
    }

    @GetMapping("")
    public void getGpsData() {
        String test = "";
    }
}
