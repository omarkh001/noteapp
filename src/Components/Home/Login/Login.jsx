import React from "react";

import img from "../../Assets/notesBlack.png";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
export default function Login() {
  let navigate = useNavigate();
  const validation = yup.object({
    email: yup.string().required("email is required").email("invaild email"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-z][a-z0-9]{3,8}$/, "Invalid password"),
  });

  async function getLogin(values) {
    let { data } = await axios.post(
      "https://note-sigma-black.vercel.app/api/v1/users/signin",
      values
    );
    if (data.msg == "done") {
      navigate("/home");
      localStorage.setItem("userToken", data.token);
    }

    // console.log(values)  ;
    console.log(data);
  }
  let LoginForimk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: getLogin,
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
                  <h2 className="text-center fw-bold my-4">Login Now!</h2>
                  <form onSubmit={LoginForimk.handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={LoginForimk.values.email}
                        onBlur={LoginForimk.handleBlur}
                        onChange={LoginForimk.handleChange}
                      />
                      <label htmlFor="email">Email</label>
                      {LoginForimk.errors.email && LoginForimk.touched.email ? (
                        <div className=" alert alert-danger">
                          {LoginForimk.errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="password"
                        value={LoginForimk.values.password}
                        onBlur={LoginForimk.handleBlur}
                        onChange={LoginForimk.handleChange}
                      />
                      <label htmlFor="password">password </label>
                      {LoginForimk.errors.password &&
                      LoginForimk.touched.password ? (
                        <div className=" alert alert-danger">
                          {LoginForimk.errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <h5 className="  fw-semibold h6">
                        Dont have an account?{" "}
                        <Link to={"/register"}>Register</Link>
                      </h5>
                      <button
                        disabled={!(LoginForimk.dirty && LoginForimk.isValid)}
                        className="btn mx-2  d-block btn-info ms-auto"
                      >
                        Login
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
