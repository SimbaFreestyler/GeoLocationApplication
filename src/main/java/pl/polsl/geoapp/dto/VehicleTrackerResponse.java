package pl.polsl.geoapp.dto;

import pl.polsl.geoapp.dto.tracker.TrackerResponse;
import pl.polsl.geoapp.dto.vehicle.VehicleResponse;
import pl.polsl.geoapp.model.VehicleTrackerEntity;
import java.time.LocalDate;

public class VehicleTrackerResponse {
    private TrackerResponse tracker;

    private VehicleResponse vehicle;

    private LocalDate startDate;

    private LocalDate endDate;

    public TrackerResponse getTracker() {
        return tracker;
    }

    public void setTracker(TrackerResponse tracker) {
        this.tracker = tracker;
    }

    public VehicleResponse getVehicle() {
        return vehicle;
    }

    public void setVehicle(VehicleResponse vehicle) {
        this.vehicle = vehicle;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public static VehicleTrackerResponse fromEntity(VehicleTrackerEntity entity) {
        VehicleTrackerResponse response = new VehicleTrackerResponse();
        response.setTracker(TrackerResponse.fromEntity(entity.getTracker()));
        response.setVehicle(VehicleResponse.fromEntity(entity.getVehicle()));
        response.setStartDate(entity.getId().getStartDate());
        response.setEndDate(entity.getEndDate());
        return response;
    }
}
