package pl.polsl.geoapp.dto.vehicle;

import pl.polsl.geoapp.model.VehicleEntity;

import javax.validation.constraints.NotNull;

public class VehicleResponse {
    @NotNull
    private String registrationNumber;

    @NotNull
    private String vinNumber;

    @NotNull
    private String brand;

    @NotNull
    private String model;

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getVinNumber() {
        return vinNumber;
    }

    public void setVinNumber(String vinNumber) {
        this.vinNumber = vinNumber;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public static VehicleResponse fromEntity(VehicleEntity entity) {
        VehicleResponse response = new VehicleResponse();
        response.setRegistrationNumber(entity.getRegistrationNumber());
        response.setVinNumber(entity.getVinNumber());
        response.setBrand(entity.getBrand());
        response.setModel(entity.getModel());
        return response;
    }
}
