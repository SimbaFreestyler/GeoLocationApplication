package pl.polsl.geoapp;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.geoapp.dto.tracker.TrackerRequest;
import pl.polsl.geoapp.dto.tracker.TrackerResponse;
import pl.polsl.geoapp.service.TrackerService;

@RestController
@RequestMapping("tracker")
public class TrackerController {
    private TrackerService trackerService;

    public TrackerController(TrackerService trackerService) {
        this.trackerService = trackerService;
    }

    @PostMapping
    public ResponseEntity<TrackerResponse> createTracker(@RequestBody TrackerRequest request) {
        return new ResponseEntity<>(trackerService.createTracker(request), HttpStatus.CREATED);
    }
}
