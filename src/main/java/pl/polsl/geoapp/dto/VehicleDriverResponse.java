package pl.polsl.geoapp.dto;

import pl.polsl.geoapp.dto.driver.DriverResponse;
import pl.polsl.geoapp.dto.vehicle.VehicleResponse;
import pl.polsl.geoapp.model.VehicleDriverEntity;

import java.time.LocalDate;

public class VehicleDriverResponse {
    private DriverResponse driver;

    private VehicleResponse vehicle;

    private LocalDate startDate;

    private LocalDate endDate;

    public DriverResponse getDriver() {
        return driver;
    }

    public void setDriver(DriverResponse driver) {
        this.driver = driver;
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

    public static VehicleDriverResponse fromEntity(VehicleDriverEntity entity) {
        VehicleDriverResponse response = new VehicleDriverResponse();
        response.setDriver(DriverResponse.fromEntity(entity.getDriver()));
        response.setVehicle(VehicleResponse.fromEntity(entity.getVehicle()));
        response.setStartDate(entity.getId().getStartDate());
        response.setEndDate(entity.getEndDate());
        return response;
    }
}
