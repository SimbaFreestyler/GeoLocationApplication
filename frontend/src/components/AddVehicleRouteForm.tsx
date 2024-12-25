import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../css/form.css";
import { getVehicles } from "../actions/vehicles";
import { VehicleResponse } from "../dto/dto";

type FormState = {
  registrationNumber: string;
  fullName: string;
  startDate: string;
  endDate: string;
};

type Props = {
  onClose: () => void;
  onAddVehicle: (vehicle: FormState) => void;
};

function AddVehicleRouteForm({ onClose, onAddVehicle: onAddDriver }: Props) {
  const [vehicles, setDrivers] = useState<VehicleResponse[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  useEffect(() => {
    const fetchData = async () => {
      const vehicleData = await getVehicles();
      if (vehicleData) {
        setDrivers(vehicleData);
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const selectedVehicle = vehicles.find((vehicle) => vehicle.registrationNumber === data.registrationNumber);
    if (!selectedVehicle) {
        console.error("Wybrany pojazd nie został znaleziony.");
        return;
      }

    onAddDriver({
        ...data,
        fullName: `${selectedVehicle.brand} ${selectedVehicle.model}`,
      });
    onClose();
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-title">Dodaj trasę pojazdu do mapy</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label" htmlFor="driverId">
            Wybierz kierowcę
          </label>
          <select
            className="form-input"
            id="driverId"
            {...register("registrationNumber", {
              required: "Wybór pojazdu jest wymagany",
            })}
          >
            <option value="">-- Wybierz pojazd --</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.registrationNumber} value={vehicle.registrationNumber ?? ""}>
                {vehicle.brand} {vehicle.model} - {vehicle.registrationNumber}
              </option>
            ))}
          </select>
          {errors.registrationNumber && (
            <span className="form-error">{errors.registrationNumber.message}</span>
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
            <span className="form-error">{errors.startDate.message}</span>
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
            value="Dodaj"
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

export default AddVehicleRouteForm;
