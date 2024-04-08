import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import {
  Bounce,
  Fade,
  Flip,
  Hinge,
  JackInTheBox,
  Roll,
  Rotate,
  Zoom,
} from "react-awesome-reveal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Note({ NoteDetials, noteDelete, error, getNotes }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function updateNote(values, id) {
    let { data } = await axios.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${NoteDetials._id}`,
      values,
      {
        headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
      }
    );
    getNotes();
    handleClose();
  }

  let updateFormik = useFormik({
    initialValues: {
      title: NoteDetials.title,
      content: NoteDetials.content,
    },
    onSubmit: updateNote,
  });
  return (
    <>
      <div className="col-md-6">
        <div
          className="card text-bg-secondary mb-3"
          // style={{ maxWidth: "25rem" }}
        >
          <div className="card-header">
            <div className="d-flex justify-content-between fw-semibold  align-items-center">
              <h4 className="fw-semibold fs-5 text-dark">
                {NoteDetials ?.title}
              </h4>
              <div>
                <i
                  onClick={() => noteDelete(NoteDetials?._id)}
                  className="fa item mx-2 text-dark fa-trash-can fs-4"
                ></i>
                <i
                  onClick={handleShow}
                  className="fa item text-dark fa-pen-to-square fs-4"
                ></i>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p>{NoteDetials?.content}</p>
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
              defaultValue={NoteDetials.title}
              onChange={updateFormik.handleChange}
            />
            <textarea
              className=" form-control"
              cols={5}
              rows={5}
              placeholder="content"
              name="content"
              defaultValue={NoteDetials.content}
              onChange={updateFormik.handleChange}
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateFormik.handleSubmit}>
            update Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
