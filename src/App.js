import Landing from "./components/landing/landing";
import Axios from "axios";
import { getAuthInfo } from "./components/shared/helpers";
import { BASE_URL } from "./components/shared/constants";
const App = () => {
  Axios.defaults.baseURL = `${BASE_URL}`;

  Axios.interceptors.request.use((request) => {
    const authInfo = getAuthInfo();
    if (authInfo) {
      request.headers["Authorization"] = `Bearer ${authInfo.access_token}`;
    }

    return request;
  });

  const interceptor = (error) => {
    if (error.response) {
      if (error.response.status === 500) {
        // alert("Server error");
        return;
      }
      if (error.response.status === 401) {
        // Refresh token code

        // Reject the current request while the token refreshes
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  };

  Axios.interceptors.response.use(undefined, interceptor);

  return (
    <>
      <Landing />
    </>
  );
};

export default App;
