package pl.polsl.geoapp.service;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final GeometryFactory geometryFactory;

    public LocationService(GeometryFactory geometryFactory) {

        this.geometryFactory = geometryFactory;
    }

    public Point createPoint(double longitude, double latitude) {
        return geometryFactory.createPoint(new Coordinate(longitude, latitude));
    }
}
