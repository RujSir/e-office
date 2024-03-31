import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function ModalNews({
  selectedData,
  setSelectedData,
  showModal,
  setShowModal,
  onUpdateNew,
}) {
  const [data, setData] = useState({
    NewsId: "",
    NameNews: "",
    Detail: "",
    Status: 1,
    UpdatedDate: "",
    ButtonView: 1,
    ButtonEdit: 1,
    ButtonDelete: 1,
  });

  useEffect(() => {
    if (showModal.dialog === true) {
      if (showModal.text === "Add") {
        setData({
          NewsId: "",
          NameNews: "",
          Detail: "",
          Status: 1,
          UpdatedDate: "",
          ButtonView: 1,
          ButtonEdit: 1,
          ButtonDelete: 1,
        });
      } else {
        setData({
          ...selectedData,
        });
      }
    }
  }, []);

  const onInputTextChange = (e, key) => {
    let val = (e.target && e.target.value) || e.value;
    const id = key && key !== "" ? key : (e.target && e.target.id) || "";

    setData({
      ...data,
      [`${id}`]: val,
    });
  };

  const onCheckChange = (e, key) => {
    const id = key && key !== "" ? key : (e.target && e.target.id) || "";
    if (e.checked) {
      setData({
        ...data,
        [`${id}`]: true,
      });
    } else {
      setData({
        ...data,
        [`${id}`]: false,
      });
    }
  };

  const handleCloseModal = () => {
    setSelectedData(null);
    setShowModal(false);
  };

  const handleSave = (val) => {
    let req = {
      employee: 3,
      NewsId: val.NewsId,
      NameNews: val.NameNews,
      Detail: val.Detail,
      Status: val.Status,
      UpdatedDate: new Date(),
      ButtonView: val.ButtonView,
      ButtonEdit: val.ButtonEdit,
      ButtonDelete: val.ButtonDelete,
    };
    onUpdateNew(req);
    setShowModal(false);
  };
  const handleAdd = (val) => {
    let req = {
      employee: 3,
      NewsId: val.NewsId,
      NameNews: val.NameNews,
      Detail: val.Detail,
      Status: val.Status,
      UpdatedDate: new Date(),
      ButtonView: val.ButtonView,
      ButtonEdit: val.ButtonEdit,
      ButtonDelete: val.ButtonDelete,
    };
    onUpdateNew(req);
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal.dialog === true} onHide={handleCloseModal}>
        <Modal.Header closeButton style={{ backgroundColor: "#003568" }}>
          <Modal.Title>
            <span style={{ color: "#fff" }}>รายละเอียดข่าวประชาสัมพันธ์</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="form-group">
              <label htmlFor="NameNews">
                <span style={{ color: "navy" }}>ชื่อเรื่อง</span>
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                id="NameNews"
                name="NameNews"
                value={data.NameNews}
                type="text"
                defaultValue={data?.NameNews}
                onChange={onInputTextChange}
              />{" "}
            </div>
            <div className="form-group">
              <label htmlFor="det">
                {" "}
                <span style={{ color: "navy" }}>เนื้อหา</span>
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                id="Detail"
                name="Detail"
                value={data.Detail}
                type="text"
                defaultValue={data?.Detail}
                onChange={onInputTextChange}
              />
            </div>
            <div className="checkbox">
              <label>
                <span style={{ color: "navy" }}>สถานะ</span>
              </label>
            </div>

            <Form.Group controlId="formstatus" className="p-mt-2">
              <Form.Label></Form.Label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="Status"
                  name="Status"
                  checked={data.Status === 1 || data.Status === true}
                  onChange={(e) => onCheckChange(e.target, "Status")}
                />
                <span className="switch"></span>
              </label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {showModal.text === "edit" ? (
            <Button variant="primary" onClick={() => handleSave(data)}>
              Save
            </Button>
          ) : showModal.text === "delete" ? (
            <Button variant="danger" onClick={() => handleSave(data)}>
              delete
            </Button>
          ) : (
            showModal.text === "delete" && (
              <Button variant="primary" onClick={() => handleAdd(data)}>
                Save
              </Button>
            )
          )}

          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
