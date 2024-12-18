package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.VehicleTrackerEntity;
import pl.polsl.geoapp.model.VehicleTrackerEntityId;

public interface VehicleTrackerRepository extends CrudRepository<VehicleTrackerEntity, VehicleTrackerEntityId> {
}
