package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.TrackerVehicleEntity;
import pl.polsl.geoapp.model.TrackerVehicleEntityId;

public interface TrackerVehicleRepository extends CrudRepository<TrackerVehicleEntity, TrackerVehicleEntityId> {
}
