import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../css/form.css";
import { getVehicles } from "../actions/vehicles";
import { getTrackers } from "../actions/trackers";
import {
  TrackerResponse,
  VehicleResponse,
  VehicleTrackerRequest,
} from "../dto/dto";
import { createVehicleTracker } from "../actions/vehicleTrackers";
import { validateDateRange } from "../actions/validation";

type FormState = {
  vehicleId: string;
  trackerId: string;
  startDate: string;
  endDate: string;
};

type Props = {
  onClose: () => void;
};

function AddVehicleTrackerForm({ onClose }: Props) {
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [trackers, setTrackers] = useState<TrackerResponse[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormState>();

  useEffect(() => {
    const fetchData = async () => {
      const vehicleData = await getVehicles();
      const trackerData = await getTrackers();
      if (vehicleData) {
        setVehicles(vehicleData);
      }
      if (trackerData) {
        setTrackers(trackerData);
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const vehicleTrackerRequest: VehicleTrackerRequest = {
      vehicleId: data.vehicleId,
      trackerId: data.trackerId,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    const createdTracker = await createVehicleTracker(vehicleTrackerRequest);
    console.log(createdTracker);

    if (createdTracker) {
      console.log("Vehicle tracker created successfully:", createdTracker);
      onClose();
      reset();
    } else {
      console.error("Failed to create vehicle tracker.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-title">Powiąż pojazd z lokalizatorem</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label" htmlFor="vehicleId">
            Wybierz pojazd
          </label>
          <select
            className="form-input"
            id="vehicleId"
            {...register("vehicleId", {
              required: "Wybór pojazdu jest wymagany",
            })}
          >
            <option value="">-- Wybierz pojazd --</option>
            {vehicles.map((vehicle) => (
              <option
                key={vehicle.registrationNumber}
                value={vehicle.registrationNumber}
              >
                {vehicle.brand} {vehicle.model} - {vehicle.registrationNumber}
              </option>
            ))}
          </select>
          {errors.vehicleId && (
            <span className="form-error form-validation-text">
              {errors.vehicleId.message}
            </span>
          )}

          <label className="form-label" htmlFor="trackerId">
            Wybierz lokalizator
          </label>
          <select
            className="form-input"
            id="trackerId"
            {...register("trackerId", {
              required: "Wybór lokalizatora jest wymagany",
            })}
          >
            <option value="">-- Wybierz lokalizator --</option>
            {trackers.map((tracker) => (
              <option key={tracker.serialNumber} value={tracker.serialNumber}>
                {tracker.name} - {tracker.serialNumber}
              </option>
            ))}
          </select>
          {errors.trackerId && (
            <span className="form-error form-validation-text">
              {errors.trackerId.message}
            </span>
          )}

          <label className="form-label" htmlFor="startDate">
            Data od
          </label>
          <input
            type="date"
            className="form-input"
            id="startDate"
            {...register("startDate", {
              required: "Data od jest wymagana",
              validate: (value) =>
                validateDateRange(value, getValues("endDate")),
            })}
          />
          {errors.startDate && (
            <span className="form-error form-validation-text">
              {errors.startDate.message}
            </span>
          )}

          <label className="form-label" htmlFor="endDate">
            Data do
          </label>
          <input
            type="date"
            className="form-input"
            id="endDate"
            {...register("endDate", {
              validate: (value) =>
                validateDateRange(getValues("startDate"), value),
            })}
          />
          {errors.endDate && (
            <span className="form-error form-validation-text">
              {errors.endDate.message}
            </span>
          )}

          <input
            className="form-btn add"
            type="submit"
            value="Dodaj powiązanie"
          />
          <input
            className="form-btn delete"
            type="button"
            value="Anuluj"
            onClick={() => onClose()}
          />
        </form>
      </div>
    </div>
  );
}

export default AddVehicleTrackerForm;
