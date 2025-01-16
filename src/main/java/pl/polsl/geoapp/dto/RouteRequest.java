package pl.polsl.geoapp.dto;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class RouteRequest {
    @NotNull
    PeriodType periodType;

    String trackerId;

    String vehicleId;

    Integer driverId;

    LocalDate startDate;

    LocalDate endDate;

    public @NotNull PeriodType getPeriodType() {
        return periodType;
    }

    public void setPeriodType(@NotNull PeriodType periodType) {
        this.periodType = periodType;
    }

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerId) {
        this.trackerId = trackerId;
    }

    public String getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(String vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Integer getDriverId() {
        return driverId;
    }

    public void setDriverId(Integer driverId) {
        this.driverId = driverId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
