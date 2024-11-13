package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.VehicleEntity;

public interface VehicleRepository extends CrudRepository<VehicleEntity, String> {
}
