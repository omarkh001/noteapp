import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img2 from "../Assets/notesInfo.png";

export default function Sidebar() {
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    navigate("/Login");
  }
  return (
    <>
      <nav>
        <div
          className="fixed-top min-vh-100 overflow-hidden bg-dark pt-2"
          style={{ width: "150px" }}
        >
          <NavLink to={"/home"}>
            <div className="w-100 d-flex justify-content-center align-items-center ">
              <img src={img2} className="w-50" alt="notesInfo" />
              <i className=" fa-regular fa-note-sticky fs-1 "></i>
            </div>
          </NavLink>
          <ul className="p-0 mt-4">
            <NavLink>
              <li className="li-bg fs-5 ps-3 mb-3 ">Home</li>
            </NavLink>
            <NavLink onClick={logOut}>
              <li className="li-bg fs-5 ps-3 mb-3 ">Log Out</li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
}
