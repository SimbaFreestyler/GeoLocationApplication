import React from "react";

type Props = {
  onClose: () => void;
};

function HelpDialog({ onClose }: Props) {
  return (
    <div className="help-dialog">
      <div className="form-box">
        <h1 className="form-title">Konfiguracja lokalizatora</h1>
        <br></br>
        <p className="form-label">
          1. Skonfiguruj APN zgodnie z instrukcją otrzymaną wraz z produktem od
          producenta
        </p>
        <br></br>
        <p className="form-label">
          2. Wyślij SMS o treści "cxzt". Numer złożony z cyfr poprzedzony
          napisem "ID:" to numer seryjny, który należy wpisać przy dodawaniu
          nowego lokalizatora w aplikacji
        </p>
        <br></br>
        <p className="form-label">
          3. Wyślij SMS o treści "interval,password,10 (zamiast password wpisz
          hasło - domyślnie jest to 123456)
        </p>
        <br></br>
        <p className="form-label">4. Wyślij SMS o treści "ip 0.0.0.0 8080"</p>
        <input
          className="form-btn delete"
          type="button"
          value="Anuluj"
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
}

export default HelpDialog;
