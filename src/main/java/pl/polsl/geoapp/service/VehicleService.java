package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.VehicleTrackerRequest;
import pl.polsl.geoapp.dto.VehicleTrackerResponse;
import pl.polsl.geoapp.dto.vehicle.VehicleRequest;
import pl.polsl.geoapp.dto.vehicle.VehicleResponse;
import pl.polsl.geoapp.model.TrackerEntity;
import pl.polsl.geoapp.model.VehicleEntity;
import pl.polsl.geoapp.model.VehicleTrackerEntity;
import pl.polsl.geoapp.model.VehicleTrackerEntityId;
import pl.polsl.geoapp.repository.TrackerRepository;
import pl.polsl.geoapp.repository.VehicleRepository;
import pl.polsl.geoapp.repository.VehicleTrackerRepository;

@Service
public class VehicleService {


    private final VehicleRepository vehicleRepository;
    private final TrackerRepository trackerRepository;
    private final VehicleTrackerRepository vehicleTrackerRepository;

    public VehicleService(VehicleRepository vehicleRepository, TrackerRepository trackerRepository, VehicleTrackerRepository vehicleTrackerRepository) {
        this.vehicleRepository = vehicleRepository;
        this.trackerRepository = trackerRepository;
        this.vehicleTrackerRepository = vehicleTrackerRepository;
    }

    @Transactional
    public VehicleResponse createVehicle(VehicleRequest request) {
        VehicleEntity entity = new VehicleEntity();
        entity.setRegistrationNumber(request.getRegistrationNumber());
        entity.setVinNumber(request.getVinNumber());
        entity.setBrand(request.getBrand());
        entity.setModel(request.getModel());
        return VehicleResponse.fromEntity(vehicleRepository.save(entity));
    }

    @Transactional
    public VehicleResponse[] getVehicles() {
        return vehicleRepository.findAll().stream()
                .map(VehicleResponse::fromEntity)
                .toArray(VehicleResponse[]::new);
    }

    @Transactional
    public VehicleTrackerResponse createVehicleTracker(VehicleTrackerRequest request) {
        VehicleTrackerEntityId id = new VehicleTrackerEntityId();
        id.setTrackerId(request.getTrackerId());
        id.setVehicleId(request.getVehicleId());
        id.setStartDate(request.getStartDate());
        VehicleTrackerEntity entity = new VehicleTrackerEntity();
        entity.setId(id);
        TrackerEntity tracker = trackerRepository.findById(request.getTrackerId())
                .orElseThrow(() -> new RuntimeException("Tracker not found with id: " + request.getTrackerId()));
        entity.setTracker(tracker);
        VehicleEntity vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + request.getVehicleId()));
        entity.setVehicle(vehicle);
        entity.setEndDate(request.getEndDate());
        return VehicleTrackerResponse.fromEntity(vehicleTrackerRepository.save(entity));
    }

    @Transactional
    public VehicleTrackerResponse[] getVehicleTrackers() {
        return vehicleTrackerRepository.findAll().stream()
                .map(VehicleTrackerResponse::fromEntity)
                .toArray(VehicleTrackerResponse[]::new);
    }
}
