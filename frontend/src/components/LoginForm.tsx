import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { request } from "./UrlData";
import "../login.css";
import classNames from "classnames";

type FormState = {
  username: string;
  password: string;
};

function LoginForm() {
  const [state, setState] = useState<string>("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    request("POST", "/login", data);
  };

  return (
    state === "login" && (
      <div className="login-container">
        <div className="login-box">
          <h1 className="title">Zaloguj się na swoje konto</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label-font" htmlFor="username">
              Nazwa użytkownika
            </label>
            <input
              className="deep-input"
              id="username"
              {...register("username", {
                required: true,
                pattern: /^[a-zA-Z]+$/,
              })}
            />
            <label className="label-font" htmlFor="password">
              Hasło
            </label>
            <input
              className="deep-input"
              id="password"
              {...register("password", { required: true })}
            />
            <input className="btn btn-primary" type="submit" value="Zaloguj" />
            <button onClick={() => setState("register")} className="register-link">
              Nie masz jeszcze konta? Zarejestruj się
            </button>
          </form>
        </div>
      </div>
    ) ||
    state === "register" && (<div className="login-container">
      <div className="login-box">
        <h1 className="title">Utwórz nowe konto</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label-font" htmlFor="username">
            Nazwa użytkownika
          </label>
          <input
            className="deep-input"
            id="username"
            {...register("username", {
              required: true,
              pattern: /^[a-zA-Z]+$/,
            })}
          />
          <label className="label-font" htmlFor="password">
            Hasło
          </label>
          <input
            className="deep-input"
            id="password"
            {...register("password", { required: true })}
          />
          <input className="btn btn-primary" type="submit" value="Zarejestruj się" />
          <button onClick={() => setState("login")} className="register-link">
            Masz już konto? Zaloguj się
          </button>
        </form>
      </div>
    </div>)
  );
}

export default LoginForm;
