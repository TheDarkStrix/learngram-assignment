import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import urls from "../../../shared/urls";
import axios from "axios";
import style from "./login.module.css";
import { saveAuthInfo } from "../../../shared/helpers";
import { useHistory } from "react-router";
import Cookies from "js-cookie";

const Login = () => {
  const history = useHistory();

  const asyncCookieStorage = {
    setItem: async function (key, value) {
      await Promise.resolve();
      Cookies.set(key, value);
    },
    getItem: async function (key) {
      await Promise.resolve();
      return Cookies.get(key);
    },
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required").max(50),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values) => {
    try {
      const res = await axios.post(urls.auth.login, {
        email: values.email,
        password: values.password,
      });
      if (res.data) {
        //await saveAuthInfo(res.data.jwt);//
        // Cookies.set("auth", res.data.jwt );
        asyncCookieStorage
          .setItem("auth", res.data.jwt)
          .then(function () {
            return asyncCookieStorage.getItem("auth");
          })
          .then(function (value) {
            console.log("Value has been set to:", value);
            window.location.href = "/";
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.loginContainer}>
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup className="mb-3">
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email id"
            onChange={formik.handleChange}
            value={formik.values.email}
            invalid={formik.errors.email && formik.touched.email}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
            invalid={formik.errors.password && formik.touched.password}
          />
        </FormGroup>
        <div className="d-flex justify-content-center">
          <button className={["text-uppercase", style.submitBtn].join(" ")}>
            login
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
