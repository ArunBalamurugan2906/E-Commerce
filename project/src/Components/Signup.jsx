import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let Schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Enter Your Fullname"),
  email: Yup.string()
    .email()
    .required("email is required")
    .matches(/^[a-z0-9]+@[a-z]{3,5}.[a-z]{3,5}$/, "Enter Valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^[a-z0-9]{8,}$/, "Password must 8 more lower case characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
const Signup = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  let handleData = (data) => {
    console.log(data);
  };
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
    display: "grid",
    gap: "20px",
  };
  return (
    <Paper
      elevation={20}
      style={paperStyle}
      component="form"
      onSubmit={handleSubmit(handleData)}
    >
      <Typography variant="h5">Create account</Typography>
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="E-mail"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        label="Confirm Password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        style={{ backgroundColor: "AccentColor", color: "black" }}
      >
        Signup
      </Button>
    </Paper>
  );
};

export default Signup;
