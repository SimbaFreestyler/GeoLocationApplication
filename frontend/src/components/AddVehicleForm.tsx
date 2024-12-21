import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../css/form.css";
import { createVehicle } from "../actions/vehicles";
import { VehicleRequest } from "../dto/dto";

type FormState = {
  brand: string;
  model: string;
  registrationNumber: string;
  vinNumber: string;
};

type Props = {
    onClose: () => void;
}

function AddVehicleForm({onClose}: Props) {
  const [formState, setFormState] = useState<string>("addVehicle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>();

  const onAddVehicleSubmit: SubmitHandler<FormState> = async (data) => {
    const vehicleRequest: VehicleRequest = {
      brand: data.brand,
      model: data.model,
      registrationNumber: data.registrationNumber,
      vinNumber: data.vinNumber,
  };

  const createdVehicle = await createVehicle(vehicleRequest);

  if (createdVehicle) {
      console.log("Vehicle created successfully:", createdVehicle);
      onClose();
      reset();
  } else {
      console.error("Failed to create vehicle.");
  
  };
}

  return (
    formState === "addVehicle" && (
      <div className="form-container">
        <div className="form-box">
          <h1 className="form-title">Dodaj nowy pojazd</h1>
          <form onSubmit={handleSubmit(onAddVehicleSubmit)}>
            <label className="form-label" htmlFor="brand">
              Marka
            </label>
            <input
              className="form-input"
              id="brand"
              {...register("brand", { required: "Marka jest wymagana" })}
            />
            <label className="form-label" htmlFor="model">
              Model
            </label>
            <input
              className="form-input"
              id="model"
              {...register("model", { required: "Model jest wymagany" })}
            />
            <label className="form-label" htmlFor="registrationNumber">
              Tablica rejestracyjna
            </label>
            <input
              className="form-input"
              id="registrationNumber"
              {...register("registrationNumber", { required: "Tablica rejestracyjna jest wymagana" })}
            />
            <label className="form-label" htmlFor="vinNumber">
              VIN
            </label>
            <input
              className="form-input"
              id="vinNumber"
              {...register("vinNumber", { required: "VIN jest wymagany" })}
            />
            <input className="form-btn add" type="submit" value="Dodaj pojazd" />
            <input className="form-btn delete" type="button" value="Anuluj" onClick={() => onClose()}/>
          </form>
        </div>
      </div>
    )
  );
}

export default AddVehicleForm;
