import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../css/form.css";
import { getVehicles } from "../actions/vehicles";
import { DriverResponse, VehicleDriverRequest, VehicleResponse } from "../dto/dto";
import { getDrivers } from "../actions/drivers";
import { createVehicleDriver } from "../actions/vehicleDrivers";

type FormState = {
  vehicleId: string;
  driverId: number;
  startDate: string;
  endDate: string;
};

type Props = {
  onClose: () => void;
};

function AddVehicleDriverForm({ onClose }: Props) {
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>();

  useEffect(() => {
    const fetchData = async () => {
      const vehicleData = await getVehicles();
      const driverData = await getDrivers();
      if (vehicleData) {
        setVehicles(vehicleData);
      }
      if (driverData) {
        setDrivers(driverData);
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const vehicleDriverRequest: VehicleDriverRequest = {
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    const createdDriver = await createVehicleDriver(vehicleDriverRequest);
    console.log(createdDriver);
        
          if (createdDriver) {
              console.log("Vehicle driver created successfully:", createdDriver);
              onClose();
              reset();
          } else {
              console.error("Failed to create vehicle driver.");
          
          };
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-title">Powiąż pojazd z kierowcą</h1>
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
              <option key={vehicle.registrationNumber} value={vehicle.registrationNumber}>
                {vehicle.brand} {vehicle.model} - {vehicle.registrationNumber}
              </option>
            ))}
          </select>
          {errors.vehicleId && (
            <span className="form-error form-validation-text">{errors.vehicleId.message}</span>
          )}

          <label className="form-label" htmlFor="driverId">
            Wybierz kierowcę
          </label>
          <select
            className="form-input"
            id="driverId"
            {...register("driverId", {
              required: "Wybór kierowcy jest wymagany",
            })}
          >
            <option value="">-- Wybierz kierowcę --</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id ?? ""}>
                {driver.name} {driver.surname}
              </option>
            ))}
          </select>
          {errors.driverId && (
            <span className="form-error form-validation-text">{errors.driverId.message}</span>
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
            })}
          />
          {errors.startDate && (
            <span className="form-error form-validation-text">{errors.startDate.message}</span>
          )}

          <label className="form-label" htmlFor="endDate">
            Data do
          </label>
          <input
            type="date"
            className="form-input"
            id="endDate"
            {...register("endDate")}
          />

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

export default AddVehicleDriverForm;
