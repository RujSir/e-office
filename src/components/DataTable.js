import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import dateFormat from "dateformat";
import axios from "axios";
import ModalNews from "./ModalNews";
import create from "../image/icons8-edit.gif";
import file from "../image/icons8-analyze.gif";
import deleteImg from "../image/icons8-delete.png";

const DataTable = () => {
  const [showModal, setShowModal] = useState(false);

  const [newsList, setNewsList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    onGetNews();
  }, []);

  const formatDateFullTH = (date, isTime) => {
    let conv_to_date = new Date(date);
    let date_dt = new Date(
      conv_to_date.setFullYear(conv_to_date.getFullYear() + 543)
    );
    let data = "";
    if (date !== undefined && date !== null) {
      if (isTime === true) {
        data = dateFormat(date_dt, "dd/mm/yyyy HH:MM:ss");
      } else {
        data = dateFormat(date_dt, "dd/mm/yyyy");
      }
    }
    return data;
  };

  const onGetNews = async () => {
    axios
      .get("https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-GetNews")
      .then((res) => {
        let tmp = [];
        let index = 0;
        res.data.data.forEach((element) => {
          tmp.push({
            ...element,
            createDte: formatDateFullTH(element.UpdatedDate, true),
            index: ++index,
          });
        });
        setNewsList(tmp);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onGetEmployeeId3 = async () => {
    axios
      .get(
        "https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-GetNews?EmployeeId=3"
      )
      .then((res) => {
        let tmp = [];
        let index = 0;
        res.data.data.forEach((element) => {
          tmp.push({
            ...element,
            createDte: formatDateFullTH(element.UpdatedDate, true),
            index: ++index,
          });
        });
        setNewsList(tmp);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onUpdateNew = async () => {
    axios
      .post(
        "https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-UpdateStatusNews"
      )
      .then((res) => {
        if (res.data.successful === true) {
          alert("บันทึกข้อมูลสำเร็จ");
        } else {
          alert("บันทึกข้อมูลไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleToggle = (id) => {
    const newData = newsList.map((item) =>
      item.NewsId === id
        ? { ...item, Status: !item.Status ? true : false }
        : item
    );
    setNewsList(newData);
  };

  const handleEdit = (rowData, text) => {
    setSelectedData(rowData);
    setShowModal({ dialog: true, text: text });
  };

  return (
    <div>
      <div>
        <span align="left" className="headText" style={{fontSize:"30px", color: "#004282"}}>
          ข่าวประชาสัมพันธ์
        </span>
      </div>
      <div align="right">
        <Button onClick={()=>handleEdit("","Add")}>+เพิ่มข้อมูล</Button>
      </div>
      <div align="left">
        <span align="left" className="headText" style={{fontSize:"20px", color: "#004282"}}>
          รายงานประชาสัมพันธ์
        </span>
      </div>
      <br />
      <Table striped bordered hover className="data-table">
        <thead style={{color:"#8896bc"}}>
          <tr>
            <th width="5%"></th>
            <th >ลำดับ</th>
            <th>ชื่อเรื่อง</th>
            <th>วันที่</th>
            <th width="10%">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {newsList.length > 0 &&
            newsList.map((row) => (
              <tr key={row.index}>
                <td align="center" width="12rem">
                  <label className="toggle-switch">
                    <input
                      name="Status"
                      id="Status"
                      value={row.Status}
                      type="checkbox"
                      checked={row.Status === 1 || row.Status === true}
                      onChange={() => handleToggle(row.NewsId)}
                    />
                    <span className="switch"></span>
                  </label>
                </td>
                <td align="center">{row.index}</td>
                <td align="left">{row.NameNews}</td>
                <td>{row.createDte}</td>
                <td align="left">
                  {row.ButtonView === 1 ? (
                    <Button variant="" onClick={() => handleEdit(row, "view")}>
                      <img src={file} width="20px" />
                    </Button>
                  ) : (
                    ""
                  )}
                  {row.ButtonEdit === 1 ? (
                    <Button variant="" onClick={() => handleEdit(row, "edit")}>
                      <img src={create} />
                    </Button>
                  ) : (
                    ""
                  )}
                  {row.ButtonDelete === 1 ? (
                    <Button
                      variant=""
                      onClick={() => handleEdit(row, "delete")}
                    >
                      <img src={deleteImg} />
                    </Button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {showModal.dialog === true ? (
        <ModalNews
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          showModal={showModal}
          setShowModal={setShowModal}
          onUpdateNew={onUpdateNew}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DataTable;
