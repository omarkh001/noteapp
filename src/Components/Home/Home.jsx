import React, { useEffect } from "react";
import style from "./Home.module.css";
import Sidebar from "../SideBar/Sidebar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";
import Note from "../Note/Note";
import Swal from "sweetalert2";
export default function Home() {
  const [error, seterrorr] = useState(null);
  const [note, setNotes] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function addNote(values) {
    try {
      let { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        values,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
        }
      );
      console.log(data);
      getNotes();
      console.log(values);

      handleClose();
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
      seterrorr(error.response.data.msg);
    }
  }
  const addNoteFormik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNote,
  });
  async function getNotes() {
    let { data } = await axios.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      {
        headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
      }
    );

    console.log(data);
    setNotes(data.notes);
  }

  function noteDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          noteDeletex(id);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
        
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  }


  async function noteDeletex(id) {
    try {
      let { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
        }
      );
     
      getNotes();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div className="mb-5 ">
              <button
                type="button"
                className="btn bg-white ms-auto d-block mt-5 fw-bold fs-4 "
                onClick={handleShow}
              >
                <i className=" fa fa-circle-plus mx-2"></i>
                add Note
              </button>
            </div>
            
            <div className="row gy-2">
              {note.map((not) => (
                <Note
                  key={not._id}
                  NoteDetials={not}
                  error={error}
                  noteDelete={noteDelete}
                  getNotes={getNotes}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className=" ms-auto fw-bold">Note modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? <div className="alert alert-danger">{error}</div> : null}
          <form>
            <input
              type="text"
              id="title"
              name="title"
              className=" form-control mb-2"
              placeholder="title"
              value={addNoteFormik.values.title}
              onChange={addNoteFormik.handleChange}
            />
            <textarea
              className=" form-control"
              cols={5}
              rows={5}
              placeholder="content"
              name="content"
              value={addNoteFormik.values.content}
              onChange={addNoteFormik.handleChange}
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNoteFormik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
