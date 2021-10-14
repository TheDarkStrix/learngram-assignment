import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import urls from "../../../shared/urls";
import axios from "axios";
import style from "./signup.module.css";
import Cookies from "js-cookie";

const SignUp = () => {
  const [currentStage, setCurrentStage] = useState(0);

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
    otp: "",
  };

  const validationSchema =
    currentStage === 0
      ? Yup.object({
          email: Yup.string().email().required("Required"),
          password: Yup.string().required("Required").max(50),
        })
      : Yup.object({
          email: Yup.string().email().required("Required"),
          password: Yup.string().required("Required").max(50),
          otp: Yup.number()
            .required("Required")
            .typeError("That doesn't look like a phone number")
            .positive("A OTP can't start with a minus")
            .integer("A OTP can't include a decimal point")
            .min(6),
        });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values) => {
    if (currentStage === 0) {
      try {
        const res = await axios.post(urls.auth.signup, {
          email: values.email,
          password: values.password,
        });
        if (res.data) {
          setCurrentStage(1);
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
      }
    } else if (currentStage === 1) {
      try {
        const res = await axios.post(urls.auth.verifyOTP, {
          email: values.email,
          otp: values.otp,
        });
        if (res.data) {
          setCurrentStage(1);
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
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <>
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
        {currentStage === 1 ? (
          <FormGroup className="mb-3">
            <Label for="examplePassword">OTP</Label>
            <Input
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              onChange={formik.handleChange}
              value={formik.values.otp}
              invalid={formik.errors.otp && formik.touched.otp}
            />
          </FormGroup>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center">
          <button className={["text-uppercase", style.submitBtn].join(" ")}>
            {currentStage === 0 ? "Send OTP" : "Signup"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default SignUp;
