package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.location.LocationResponse;
import pl.polsl.geoapp.dto.location.VehicleRouteResponse;
import pl.polsl.geoapp.model.VehicleTrackerEntity;
import pl.polsl.geoapp.repository.LocationRepository;
import pl.polsl.geoapp.repository.VehicleTrackerRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService {

    private final GeometryFactory geometryFactory;
    private final VehicleTrackerRepository vehicleTrackerRepository;
    private final LocationRepository locationRepository;

    public LocationService(GeometryFactory geometryFactory, VehicleTrackerRepository vehicleTrackerRepository, LocationRepository locationRepository) {

        this.geometryFactory = geometryFactory;
        this.vehicleTrackerRepository = vehicleTrackerRepository;
        this.locationRepository = locationRepository;
    }

    public Point createPoint(double longitude, double latitude) {
        return geometryFactory.createPoint(new Coordinate(longitude, latitude));
    }

    @Transactional
    public List<LocationResponse> getVehicleLocations(String registrationNumber, LocalDate startDate, LocalDate endDate) {
        List<VehicleRouteResponse> vehicleRouteList = new ArrayList<>();
        vehicleTrackerRepository.findAllById_VehicleId(registrationNumber).forEach(vehicleTrackerEntity -> {
            VehicleRouteResponse response = new VehicleRouteResponse();
            response.setTrackerId(vehicleTrackerEntity.getId().getTrackerId());
             if(vehicleTrackerEntity.getId().getStartDate().isAfter(startDate.minusDays(1L))
             && vehicleTrackerEntity.getEndDate().isBefore(endDate.plusDays(1L))){
                 response.setStartDateTime(vehicleTrackerEntity.getId().getStartDate().atStartOfDay());
                 response.setEndDateTime(vehicleTrackerEntity.getEndDate().plusDays(1L).atStartOfDay());
                 vehicleRouteList.add(response);
             } else if(vehicleTrackerEntity.getId().getStartDate().isAfter(startDate.minusDays(1L))) {
                 response.setStartDateTime(vehicleTrackerEntity.getId().getStartDate().atStartOfDay());
                 response.setEndDateTime(endDate.plusDays(1L).atStartOfDay());
                 vehicleRouteList.add(response);
             } else if(vehicleTrackerEntity.getEndDate().isBefore(endDate.plusDays(1L))) {
                 response.setStartDateTime(startDate.atStartOfDay());
                 response.setEndDateTime(vehicleTrackerEntity.getEndDate().plusDays(1L).atStartOfDay());
                 vehicleRouteList.add(response);
             }
        });

        List<LocationResponse> locationList = new ArrayList<>();
        vehicleRouteList.forEach(route -> {
            locationList.addAll(locationRepository.findAllByTracker_SerialNumberAndTimestampAfterAndTimestampBefore(
                    route.getTrackerId(), route.getStartDateTime(), route.getEndDateTime())
                    .stream().map(LocationResponse::fromEntity).toList());
        });
        return locationList;
    }
}
