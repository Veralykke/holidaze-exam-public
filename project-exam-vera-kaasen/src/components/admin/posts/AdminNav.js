import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AdminNav() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <nav>
      <Link to="/">Home </Link>
      {auth ? (
        <>
          | <Link to="/Admin"> Admin</Link> | <button onClick={logout}>log out</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default AdminNav;
