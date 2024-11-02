package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.tracker.TrackerRequest;
import pl.polsl.geoapp.dto.tracker.TrackerResponse;
import pl.polsl.geoapp.model.TrackerEntity;
import pl.polsl.geoapp.repository.TrackerRepository;

@Service
public class TrackerService {
    private final TrackerRepository trackerRepository;

    public TrackerService(TrackerRepository trackerRepository) {
        this.trackerRepository = trackerRepository;
    }

    @Transactional
    public TrackerResponse createTracker(TrackerRequest request) {
        TrackerEntity entity = new TrackerEntity();
        entity.setName(request.getName());
        trackerRepository.save(entity);
        return TrackerResponse.fromEntity(entity);
    }
}
