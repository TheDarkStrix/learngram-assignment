import { useState, useCallback } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import urls from "../../../shared/urls";
import axios from "axios";
import style from "./signup.module.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import wrong from "../../../../assets/images/close.svg";
import correct from "../../../../assets/images/tick.svg";

const indicator = {
  smallLetter: false,
  capitalLetter: false,
  numeric: false,
  validLength: false,
};

const SignUp = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [passwordIndicator, setPasswordIndicator] = useState(indicator);

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
          toast.success("Please check your email for OTP");
        }
      } catch (error) {
        if (error && error.response.data) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
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
              toast.success("Welcome !");
              window.location.href = "/";
            });
        }
      } catch (error) {
        if (error && error.response.data) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
      }
    }
  };

  const handlePassword = (event) => {
    console.log(event.target.value);

    // Check for digits
    if (/\d/.test(event.target.value)) {
      if (passwordIndicator.numeric !== true) passwordIndicator.numeric = true;
    } else {
      if (passwordIndicator.numeric !== false)
        passwordIndicator.numeric = false;
    }

    // check for Capital
    if (/[A-Z]/.test(event.target.value)) {
      if (passwordIndicator.capitalLetter !== true)
        passwordIndicator.capitalLetter = true;
    } else {
      if (passwordIndicator.capitalLetter !== false)
        passwordIndicator.capitalLetter = false;
    }

    // check for small
    if (/[a-z]/.test(event.target.value)) {
      if (passwordIndicator.smallLetter !== true)
        passwordIndicator.smallLetter = true;
    } else {
      if (passwordIndicator.smallLetter !== false)
        passwordIndicator.smallLetter = false;
    }

    // check length

    if (event.target.value.length > 7) {
      if (passwordIndicator.validLength !== true)
        passwordIndicator.validLength = true;
    } else {
      if (passwordIndicator.validLength !== false)
        passwordIndicator.validLength = false;
    }

    // setPasswordIndicator();
    formik.handleChange(event);
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
            onChange={(e) => handlePassword(e)}
            value={formik.values.password}
            invalid={formik.errors.password && formik.touched.password}
          />
          {currentStage === 0 ? (
            <div className={style.indicatorContainer}>
              <div>
                <span>
                  <img
                    className={style.indicatorIcons}
                    src={passwordIndicator.validLength ? correct : wrong}
                    width="20"
                    alt="pass_indicator"
                  />
                </span>
                <span>Password should be min 8 chars</span>
              </div>
              <div>
                <span>
                  <img
                    className={style.indicatorIcons}
                    src={passwordIndicator.capitalLetter ? correct : wrong}
                    width="20"
                    alt="pass_indicator"
                  />
                </span>
                <span>At least 1 uppercase letter [A-Z]</span>
              </div>
              <div>
                <span>
                  <img
                    className={style.indicatorIcons}
                    src={passwordIndicator.smallLetter ? correct : wrong}
                    width="20"
                    alt="pass_indicator"
                  />
                </span>
                <span>At least 1 lowercase letter [a-z]</span>
              </div>
              <div>
                <span>
                  <img
                    className={style.indicatorIcons}
                    src={passwordIndicator.numeric ? correct : wrong}
                    width="20"
                    alt="pass_indicator"
                  />
                </span>
                <span>At least 1 numeric char [0-9]</span>
              </div>
            </div>
          ) : (
            ""
          )}
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
