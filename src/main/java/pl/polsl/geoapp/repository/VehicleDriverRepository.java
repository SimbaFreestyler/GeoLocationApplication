package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.VehicleDriverEntity;
import pl.polsl.geoapp.model.VehicleDriverEntityId;

import java.util.List;

public interface VehicleDriverRepository extends CrudRepository<VehicleDriverEntity, VehicleDriverEntityId> {
    List<VehicleDriverEntity> findAll();

    List<VehicleDriverEntity> findAllById_DriverId(Integer driverId);
}
