import React from "react";
import style from "./Register.module.css";
import img from "../Assets/notesBlack.png";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
export default function Register() {
  let navigate = useNavigate();
  const validation = yup.object({
    name: yup
      .string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("Name is required"),
    email: yup.string().required("email is required").email("invaild email"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-z][a-z0-9]{3,8}$/, "Invalidpassword"),
    age: yup
      .string()
      .required("age is required ")
      .matches(/^[1-9][0-9]$/, "age must be above 10 years old."),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "enter a valid mobile number"),
  });

  async function getRegister(values) {
    let { data } = await axios.post(
      "https://note-sigma-black.vercel.app/api/v1/users/signUp",
      values
    );
    if (data.msg == "done") {
      navigate("/login");
    }

    // console.log(values);
    console.log(data);
  }
  let RegisterFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: getRegister,
    validationSchema: validation,
  });

  return (
    <>
      <section className="bg-reg">
        <li className="w-25 p-5 fixed-top me-auto">
          <div>
            <img className="w-50" src={img} alt="notesInfo" />
          </div>
        </li>

        <div className="container">
          <div className="row">
            <div className=" ms-5 col-md-6 ">
              <div className=" min-vh-100 d-flex justify-content-center align-items-center">
                <div
                  className=" bg-item shadow shadow-lg p-4  rounded-2"
                  style={{ width: "65%" }}
                >
                  <h2 className="text-center fw-bold my-4">Sign up Now!</h2>
                  <form onSubmit={RegisterFormik.handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        value={RegisterFormik.values.name}
                        onBlur={RegisterFormik.handleBlur}
                        onChange={RegisterFormik.handleChange}
                      />
                      <label htmlFor="name">Name</label>
                      {RegisterFormik.errors.name &&
                      RegisterFormik.touched.name ? (
                        <div className=" alert alert-danger">
                          {RegisterFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={RegisterFormik.values.email}
                        onBlur={RegisterFormik.handleBlur}
                        onChange={RegisterFormik.handleChange}
                      />
                      <label htmlFor="email">Email</label>
                      {RegisterFormik.errors.email &&
                      RegisterFormik.touched.email ? (
                        <div className=" alert alert-danger">
                          {RegisterFormik.errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="password"
                        value={RegisterFormik.values.password}
                        onBlur={RegisterFormik.handleBlur}
                        onChange={RegisterFormik.handleChange}
                      />
                      <label htmlFor="password">password </label>
                      {RegisterFormik.errors.password &&
                      RegisterFormik.touched.password ? (
                        <div className=" alert alert-danger">
                          {RegisterFormik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        placeholder="age"
                        value={RegisterFormik.values.age}
                        onBlur={RegisterFormik.handleBlur}
                        onChange={RegisterFormik.handleChange}
                      />
                      <label htmlFor="age">Age</label>
                      {RegisterFormik.errors.age &&
                      RegisterFormik.touched.age ? (
                        <div className=" alert alert-danger">
                          {RegisterFormik.errors.age}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="phone"
                        value={RegisterFormik.values.phone}
                        onBlur={RegisterFormik.handleBlur}
                        onChange={RegisterFormik.handleChange}
                      />
                      <label htmlFor="phone">phone</label>
                      {RegisterFormik.errors.phone &&
                      RegisterFormik.touched.phone ? (
                        <div className=" alert alert-danger">
                          {RegisterFormik.errors.phone}
                        </div>
                      ) : null}
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <h5 className="  fw-semibold h6">
                        have already an account?{" "}
                        <Link to={"/login"}>Login</Link>
                      </h5>
                      <button
                        disabled={
                          !(RegisterFormik.dirty && RegisterFormik.isValid)
                        }
                        className="btn mx-2  d-block btn-info ms-auto"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
