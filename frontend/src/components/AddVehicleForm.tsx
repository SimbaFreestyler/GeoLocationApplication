import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { request } from "./requestConfig";
import "../css/form.css";

type FormState = {
  brand: string;
  model: string;
  registrationNumber: string;
  vin: string;
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

  const onAddVehicleSubmit: SubmitHandler<FormState> = (data) => {
    request("POST", "/vehicle", {
      brand: data.brand,
      model: data.model,
      registrationNumber: data.registrationNumber,
      vin: data.vin
    }).then((response) => {
      console.log(response.status);
      reset();
    });
  };

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
            <label className="form-label" htmlFor="vin">
              VIN
            </label>
            <input
              className="form-input"
              id="vin"
              {...register("vin", { required: "VIN jest wymagany" })}
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
