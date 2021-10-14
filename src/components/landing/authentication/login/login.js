import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import urls from "../../../shared/urls";
import axios from "axios";
import { saveAuthInfo } from "../../../shared/helpers";

const Login = () => {
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
        saveAuthInfo(res.data.jwt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email id"
            onChange={formik.handleChange}
            value={formik.values.email}
            invalid={formik.errors.email}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
            invalid={formik.errors.password}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default Login;
