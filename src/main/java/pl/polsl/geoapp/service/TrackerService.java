package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.BasicResponse;
import pl.polsl.geoapp.dto.tracker.TrackerRequest;
import pl.polsl.geoapp.dto.tracker.TrackerResponse;
import pl.polsl.geoapp.model.TrackerEntity;
import pl.polsl.geoapp.model.UserEntity;
import pl.polsl.geoapp.repository.TrackerRepository;
import pl.polsl.geoapp.repository.UserRepository;

@Service
public class TrackerService {
    private final TrackerRepository trackerRepository;
    private final UserRepository userRepository;

    public TrackerService(TrackerRepository trackerRepository, UserRepository userRepository) {
        this.trackerRepository = trackerRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public TrackerResponse createTracker(TrackerRequest request, String email) {
        TrackerEntity entity = new TrackerEntity();
        entity.setSerialNumber(request.getSerialNumber());
        entity.setName(request.getName());
        entity.setType(request.getType());
        entity.setUser(userRepository.findById(email)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + email)));
        trackerRepository.save(entity);
        return TrackerResponse.fromEntity(trackerRepository.save(entity));
    }

    @Transactional
    public TrackerResponse[] getTrackers(String email) {
        return trackerRepository.findAllByUser_Email(email).stream()
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
