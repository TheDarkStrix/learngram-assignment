import Landing from "./components/landing/landing";
import Axios from "axios";
import { clearAuthInfo, getAuthInfo } from "./components/shared/helpers";
import { BASE_URL } from "./components/shared/constants";
import { BrowserRouter, Route } from "react-router-dom";
import ProtectedRoute from "./components/layout/projectedRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home/home";
const App = () => {
  Axios.defaults.baseURL = `${BASE_URL}`;

  Axios.interceptors.request.use((request) => {
    const authInfo = getAuthInfo();
    if (authInfo) {
      request.headers["Authorization"] = `Bearer ${authInfo}`;
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
        // if 401 is detected just redirect to login page
        clearAuthInfo();
        setTimeout(() => {
          window.location.href = "/landing";
        }, 2000);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  };

  Axios.interceptors.response.use(undefined, interceptor);

  return (
    <>
      <BrowserRouter>
        <Route exact path="/landing" component={Landing} />
        <ProtectedRoute exact path="/" component={Home} />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </>
  );
};

export default App;
