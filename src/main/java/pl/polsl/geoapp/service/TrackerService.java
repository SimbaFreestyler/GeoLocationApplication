package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.BasicResponse;
import pl.polsl.geoapp.dto.tracker.TrackerRequest;
import pl.polsl.geoapp.dto.tracker.TrackerResponse;
import pl.polsl.geoapp.model.TrackerEntity;
import pl.polsl.geoapp.model.VehicleEntity;
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
        entity.setSerialNumber(request.getSerialNumber());
        entity.setName(request.getName());
        entity.setType(request.getType());
        trackerRepository.save(entity);
        return TrackerResponse.fromEntity(trackerRepository.save(entity));
    }

    @Transactional
    public TrackerResponse[] getTrackers() {
        return trackerRepository.findAll().stream()
                .map(TrackerResponse::fromEntity)
                .toArray(TrackerResponse[]::new);
    }

    @Transactional
    public BasicResponse deleteTracker(String serialNumber) {
        TrackerEntity entity = trackerRepository.findById(serialNumber)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + serialNumber));
        trackerRepository.delete(entity);
        BasicResponse response = new BasicResponse();
        response.setSuccess(true);
        response.setMessage("Pomyślnie usunięto lokalizator");
        return response;
    }
}
