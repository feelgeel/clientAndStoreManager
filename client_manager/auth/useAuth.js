import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setuser } = useContext(AuthContext);

  const logIn = (authToken) => {
    let user=jwtDecode(authToken)
    // user=user.toString()
    setuser(user)
authStorage.storeToken(authToken)
  };

  const logOut = () => {
    setuser(null);
    authStorage.removeToken()
  };

  return { user, logIn, logOut };
};
