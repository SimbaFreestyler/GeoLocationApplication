import { Link } from "react-router-dom"

type Props = {
  loggedState: string;
}

function NavBar(props: Props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="fs-3">GeoApp</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse align-items-start flex-column flex md-row"
          id="navbar"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Strona główna
              </Link>
            </li>
            {props.loggedState === "loggedIn" && (<li className="nav-item">
              <Link className="nav-link" to="/map">
                Mapa
              </Link>
            </li>)}
            {props.loggedState === "loggedIn" && (<li className="nav-item">
              <Link className="nav-link" to="/vehicles">
                Pojazdy
              </Link>
            </li>)}
            {props.loggedState === "loggedIn" && (<li className="nav-item">
              <Link className="nav-link" to="/drivers">
                Kierowcy
              </Link>
            </li>)}
            {props.loggedState === "loggedIn" && (<li className="nav-item">
              <Link className="nav-link" to="/trackers">
                Lokalizatory
              </Link>
            </li>)}
            {props.loggedState === "loggedIn" && (<li className="nav-item">
              <Link className="nav-link" to="/account">
                Moje konto
              </Link>
            </li>)}
            {props.loggedState === "loggedIn" && (<li className="nav-item">
              <Link className="nav-link" to="/logout">
                Wyloguj
              </Link>
            </li>)}
            {props.loggedState === "loggedOut" && (<li className="nav-item">
              <Link className="nav-link" to="/login-page">
                Zaloguj się
              </Link>
            </li>)}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
