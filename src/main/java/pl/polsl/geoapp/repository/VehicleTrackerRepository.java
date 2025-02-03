package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNullApi;
import pl.polsl.geoapp.model.VehicleEntity;
import pl.polsl.geoapp.model.VehicleTrackerEntity;
import pl.polsl.geoapp.model.VehicleTrackerEntityId;

import java.util.List;

public interface VehicleTrackerRepository extends CrudRepository<VehicleTrackerEntity, VehicleTrackerEntityId> {
    List<VehicleTrackerEntity> findAllByVehicle_User_Email(String email);

    List<VehicleTrackerEntity> findAllById_TrackerId(String trackerId);

    List<VehicleTrackerEntity> findAllById_VehicleId(String vehicleId);
}
