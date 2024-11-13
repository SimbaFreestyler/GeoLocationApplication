package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.VehicleDriverEntity;
import pl.polsl.geoapp.model.VehicleDriverEntityId;

public interface VehicleDriverRepository extends CrudRepository<VehicleDriverEntity, VehicleDriverEntityId> {
}
