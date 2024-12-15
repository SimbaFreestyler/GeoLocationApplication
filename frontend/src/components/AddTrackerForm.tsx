import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { request } from "./requestConfig";
import "../css/form.css";

type FormState = {
  name: string;
  serialNumber: string;
  type: string;
};

type Props = {
  onClose: () => void;
};

function AddTrackerForm({ onClose }: Props) {
  const [formState, setFormState] = useState<string>("addTracker");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>();

  const onAddVehicleSubmit: SubmitHandler<FormState> = (data) => {
    request("POST", "/tracker", {
      name: data.name,
      serialNumber: data.serialNumber,
      type: data.type,
    }).then((response) => {
      console.log(response.status);
      reset();
    });
  };

  return (
    formState === "addTracker" && (
      <div className="form-container">
        <div className="form-box">
          <h1 className="form-title">Dodaj nowy lokalizator</h1>
          <form onSubmit={handleSubmit(onAddVehicleSubmit)}>
            <label className="form-label" htmlFor="name">
              Nazwa
            </label>
            <input
              className="form-input"
              id="name"
              {...register("name", {
                required: "Nazwa jest wymagana",
              })}
            />
            <label className="form-label" htmlFor="serialNumber">
              Numer seryjny
            </label>
            <input
              className="form-input"
              id="serialNumber"
              {...register("serialNumber", {
                required: "Numer seryjny jest wymagany",
              })}
            />
            <label className="form-label" htmlFor="type">
              Typ
            </label>
            <input
              className="form-input"
              id="type"
              {...register("type", {
                required: "Typ jest wymagana",
              })}
            />
            <input
              className="form-btn add"
              type="submit"
              value="Dodaj Lokalizator"
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
    )
  );
}

export default AddTrackerForm;
