package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.*;
import pl.polsl.geoapp.dto.vehicle.VehicleRequest;
import pl.polsl.geoapp.dto.vehicle.VehicleResponse;
import pl.polsl.geoapp.model.*;
import pl.polsl.geoapp.repository.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleService {


    private final VehicleRepository vehicleRepository;
    private final TrackerRepository trackerRepository;
    private final DriverRepository driverRepository;
    private final VehicleTrackerRepository vehicleTrackerRepository;
    private final VehicleDriverRepository vehicleDriverRepository;

    public VehicleService(VehicleRepository vehicleRepository, TrackerRepository trackerRepository,
                          DriverRepository driverRepository, VehicleTrackerRepository vehicleTrackerRepository,
                          VehicleDriverRepository vehicleDriverRepository) {
        this.vehicleRepository = vehicleRepository;
        this.trackerRepository = trackerRepository;
        this.driverRepository = driverRepository;
        this.vehicleTrackerRepository = vehicleTrackerRepository;
        this.vehicleDriverRepository = vehicleDriverRepository;
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
    public VehicleResponse[] getVehicles(String email) {
        return vehicleRepository.findAllByUser_Email(email).stream()
                .map(VehicleResponse::fromEntity)
                .toArray(VehicleResponse[]::new);
    }

    @Transactional
    public BasicResponse deleteVehicle(String registrationNumber) {
        VehicleEntity entity = vehicleRepository.findById(registrationNumber)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + registrationNumber));
        vehicleRepository.delete(entity);
        BasicResponse response = new BasicResponse();
        response.setSuccess(true);
        response.setMessage("Pomyślnie usunięto pojazd");
        return response;
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
    public VehicleTrackerResponse[] getVehicleTrackers(String email) {
        return vehicleTrackerRepository.findAllByVehicle_User_Email(email).stream()
                .map(VehicleTrackerResponse::fromEntity)
                .toArray(VehicleTrackerResponse[]::new);
    }

    @Transactional
    public BasicResponse deleteVehicleTracker(String registrationNumber, String serialNumber, LocalDate startDate) {
        VehicleTrackerEntityId id = new VehicleTrackerEntityId();
        id.setTrackerId(serialNumber);
        id.setVehicleId(registrationNumber);
        id.setStartDate(startDate);
        vehicleTrackerRepository.deleteById(id);
        BasicResponse response = new BasicResponse();
        response.setSuccess(true);
        response.setMessage("Pomyślnie usunięto powiązanie pojazdu z lokalizatorem");
        return response;
    }

    @Transactional
    public VehicleDriverResponse createVehicleDriver(VehicleDriverRequest request) {
        VehicleDriverEntityId id = new VehicleDriverEntityId();
        id.setDriverId(request.getDriverId());
        id.setVehicleId(request.getVehicleId());
        id.setStartDate(request.getStartDate());
        VehicleDriverEntity entity = new VehicleDriverEntity();
        entity.setId(id);
        DriverEntity driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + request.getDriverId()));
        entity.setDriver(driver);
        VehicleEntity vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + request.getVehicleId()));
        entity.setVehicle(vehicle);
        entity.setEndDate(request.getEndDate());
        return VehicleDriverResponse.fromEntity(vehicleDriverRepository.save(entity));
    }

    @Transactional
    public VehicleDriverResponse[] getVehicleDrivers(String email) {
        return vehicleDriverRepository.findAllByVehicle_User_Email(email).stream()
                .map(VehicleDriverResponse::fromEntity)
                .toArray(VehicleDriverResponse[]::new);
    }

    @Transactional
    public BasicResponse deleteVehicleDriver(String registrationNumber, Integer driverId, LocalDate startDate) {
        VehicleDriverEntityId id = new VehicleDriverEntityId();
        id.setDriverId(driverId);
        id.setVehicleId(registrationNumber);
        id.setStartDate(startDate);
        vehicleDriverRepository.deleteById(id);
        BasicResponse response = new BasicResponse();
        response.setSuccess(true);
        response.setMessage("Pomyślnie usunięto powiązanie pojazdu z kierowcą");
        return response;
    }

    @Transactional
    public List<LocationEntity> getVehicleLocation(LocalDate startDate, LocalDate endDate, String registrationNumber) {
        List<LocationEntity> locations = new ArrayList<>();
        return locations;
    }
}
