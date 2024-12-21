package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.VehicleEntity;
import pl.polsl.geoapp.model.VehicleTrackerEntity;
import pl.polsl.geoapp.model.VehicleTrackerEntityId;

import java.util.List;

public interface VehicleTrackerRepository extends CrudRepository<VehicleTrackerEntity, VehicleTrackerEntityId> {
    public List<VehicleTrackerEntity> findAll();
}
