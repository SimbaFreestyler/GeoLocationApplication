package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.vehicle.VehicleRequest;
import pl.polsl.geoapp.dto.vehicle.VehicleResponse;
import pl.polsl.geoapp.model.VehicleEntity;
import pl.polsl.geoapp.repository.VehicleRepository;

@Service
public class VehicleService {


    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
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
}
