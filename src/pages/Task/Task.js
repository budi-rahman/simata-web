import React, { useEffect, useState } from "react";
import moment from "moment";
import { api, thousandSeparator } from "helpers";
import { Button, Col, DatePicker, message, Form, Row, Table, Divider, Collapse, Select, Modal } from "antd";
import getBy from "lodash/get";
import { Link } from "react-router-dom";
import CompanySelectBox from "components/SelectBox/CompanySelectBox";
import { DownloadOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { checkPermission, Guard } from "components/Guard";

function Task() {
  const [uploadForm] = Form.useForm();
  const [filter, setFilter] = useState({});
  const [totalNetto, setTotalNetto] = useState("");
  const [tasks, setTasks] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [modalUpload, setModalUpload] = useState(false);
  const columns = [
    { key: "username", dataIndex: ["driver", "username"], title: "Username" },
    { key: "fleet", dataIndex: ["fleet", "licensePlate"], title: "Fleet" },
    { key: "pickup", dataIndex: ["pickup", "name"], title: "Pick Up Point" },
    { key: "username", dataIndex: ["delivery", "name"], title: "Delivery Point" },
    { key: "date", dataIndex: "taskDate", title: "Tgl Task" },
    { key: "netto", dataIndex: "netto", title: "Netto" },
    { key: "lastUpdate", dataIndex: "updatedAt", title: "Update Terbaru" },
    { key: "Status", dataIndex: "status", title: "Status" },
    {
      key: "action",
      title: "Action",
      render: (v, r) => <span>{checkPermission("task-admin") && <Link to={`/task/${r.id}`}>Edit</Link>}</span>,
    },
  ];

  useEffect(() => {
    getTasks({});
  }, []);

  function getTasks(payload) {
    if (!payload.startAt) {
      payload = {
        ...payload,
        startAt: moment().subtract(7, "days"),
        endAt: moment(),
      };
    }

    payload = { ...payload, startAt: payload.startAt.format("YYYY-MM-DD"), endAt: payload.endAt.format("YYYY-MM-DD") };
    setFilter(payload);

    api
      .get("/v1/task", { params: payload })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        message.error(getBy(err, "response.data.message", "Gagal mendapatkan Task"));
      });

    api
      .get("/v1/task/sum", { params: payload })
      .then(res => {
        console.log(res.data);
        setTotalNetto(res.data.totalNetto)
      })
      .catch(err => message.error(getBy(err, "response.data.message", "Gagal mendapatkan Task")))
  }

  function uploadFileTaskBulk(values) {
    let fd = new FormData();
    fd.append("file", fileData);

    api
      .post("/v1/task/bulk", fd)
      .then((res) => {
        message.success("Success upload bulk task");
        getTasks({});
        setModalUpload(false);
      })
      .catch((err) => {
        message.error(getBy(err, "response.data.message", "Gagal upload bulk task"));
      });
  }

  function downloadLog() {
    api
      .post("/v1/task/download", {}, { params: filter })
      .then((res) => {
        window.open(`${process.env.REACT_APP_API_SITE}${res.data.download}`, "_blank");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal download task")));
  }

  return (
    <div>
      <h2>Task</h2>
      <Collapse defaultActiveKey={[]} bordered={false}>
        <Collapse.Panel header="Cari" key="1">
          <Form onFinish={(values) => getTasks(values)} layout="vertical">
            <Row gutter={12}>
              <Col md={12}>
                <Form.Item name="startAt" label="Start At" initialValue={moment().subtract(7, "days")}>
                  <DatePicker className="full-width" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item name="endAt" label="End At" initialValue={moment()}>
                  <DatePicker className="full-width" />
                </Form.Item>
              </Col>
            </Row>
            {checkPermission("task-admin") && (
              <Form.Item name="companyId" label="Perusahaan">
                <CompanySelectBox className="full-width" />
              </Form.Item>
            )}
            <Form.Item name="status" label="Status" initialValue="">
              <Select>
                <Select.Option value="">All</Select.Option>
                <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                <Select.Option value="FINISHED">FINISHED</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">
                <SearchOutlined /> Cari
              </Button>
              &nbsp;
            </Form.Item>
          </Form>
        </Collapse.Panel>
      </Collapse>
      <br />
      <Guard action="task-admin">
        <Link to="/task/add">
          <Button type="primary">Tambah</Button>
        </Link>
        &nbsp;
        <Button onClick={() => setModalUpload(true)}>
          <UploadOutlined /> Bulk Upload
        </Button>
        &nbsp;
      </Guard>
      <Button type="primary" onClick={() => downloadLog()}>
        <DownloadOutlined /> Download
      </Button>
      <Divider className="divider-12" />
      <Table size="small" rowKey="id" scroll={{ x: 1200 }} footer={() => totalNetto ? `Total Netto: ${thousandSeparator(totalNetto)}` : null} columns={columns} dataSource={tasks} />
      <Modal visible={modalUpload} onCancel={() => setModalUpload(false)} onOk={() => uploadForm.submit()}>
        <p>
          Pastikan format template csv, sesuai dengan yang telah disediakan. Bisa juga download{" "}
          <a href="/template-csv/bulk-add-task.csv" target="_blank" rel="noopener noreferrer">
            disini
          </a>
        </p>
        <Form form={uploadForm} onFinish={(values) => uploadFileTaskBulk(values)}>
          <Form.Item name="file" required>
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              single
              onChange={(e) => setFileData(e.target.files[0])}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Task;
