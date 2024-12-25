import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../css/form.css";
import { DriverResponse } from "../dto/dto";
import { getDrivers } from "../actions/drivers";

type FormState = {
  driverId: number;
  fullName: string;
  startDate: string;
  endDate: string;
};

type Props = {
  onClose: () => void;
  onAddDriver: (driver: FormState) => void;
};

function AddDriverRouteForm({ onClose, onAddDriver }: Props) {
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  useEffect(() => {
    const fetchData = async () => {
      const driverData = await getDrivers();
      if (driverData) {
        setDrivers(driverData);
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const selectedDriver = drivers.find((driver) => driver.id === +data.driverId);
    if (!selectedDriver) {
        console.error("Wybrany kierowca nie został znaleziony.");
        return;
      }

    onAddDriver({
        ...data,
        fullName: `${selectedDriver.name} ${selectedDriver.surname}`,
      });
    onClose();
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-title">Dodaj trasę kierowcy do mapy</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <span className="form-error">{errors.driverId.message}</span>
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

export default AddDriverRouteForm;
