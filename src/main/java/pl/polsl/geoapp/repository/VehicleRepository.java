package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.dto.vehicle.VehicleResponse;
import pl.polsl.geoapp.model.VehicleEntity;

import java.util.List;

public interface VehicleRepository extends CrudRepository<VehicleEntity, String> {
    public List<VehicleEntity> findAll();
}
