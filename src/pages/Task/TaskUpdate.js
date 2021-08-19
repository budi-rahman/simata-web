import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message, DatePicker, InputNumber, Row, Col, Table } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";
import { useParams } from "react-router-dom";
import UserSelectBox from "components/SelectBox/UserSelectBox";
import FleetSelectBox from "components/SelectBox/FleetSelectBox";
import CheckpointSelectBox from "components/SelectBox/CheckpointSelectBox";

function nameMapper(r, task) {
  if (r.type === "departure") {
    return "Basecamp";
  } else if (r.type === "taking-item") {
    return `Quarry: ${task.pickup.name}`
  } else if (r.type === "checkpoint-item") {
    return "Basecamp";
  } else if (r.type === "delivery-item") {
    return `Jetty: ${task.delivery.name}`;
  } else if (r.type === "arrival") {
    return "Basecamp";
  } else {
    return r.type;
  }
}

function TaskUpdate({ history }) {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [form] = Form.useForm();

  const detailColumns = [
    { dataIndex: "order", key: "no", title: "No" },
    { dataIndex: "type", key: "type", title: "Nama", render: (v,r) => nameMapper(r, task) },
    { dataIndex: "finishedAt", key: "finishedAt", title: "Finished At", render: (v) => moment(new Date(v)).format("DD-MM-YYYY HH:mm:SS") },
    { dataIndex: "coordinate", key: "coordinate", title: "Coordinate" },
    { dataIndex: "status", key: "status", title: "Status" },
  ];

  useEffect(() => {
    getTaskDetail();
  }, []);

  function getTaskDetail() {
    api
      .get(`/v1/task/${id}`)
      .then((res) => {
        form.setFieldsValue({
          ...res.data,
          taskDate: moment(new Date(res.data.taskDate)),
        });
        setTask(res.data);
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan detail task")));
  }

  function onFormFinish(payload) {
    api
      .put(`/v1/task/${id}`, payload)
      .then((res) => {
        message.success("Berhasil mengganti task");
        history.push("/task");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mengganti data task")));
  }

  return (
    <div>
      <h2>Update Task</h2>
      <Form form={form} layout="vertical" onFinish={onFormFinish}>
        <Row gutter={12}>
          <Col md={12}>
            <Form.Item name="driverId" label="Pilih Driver" rules={[{ required: true }]}>
              <UserSelectBox />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item name="fleetId" label="Pilih Kendaraan" rules={[{ required: true }]}>
              <FleetSelectBox />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item name="pickUpPointId" label="Pilih Jetty" rules={[{ required: true }]}>
              <CheckpointSelectBox />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item name="deliveryPointId" label="Pilih Quarry" rules={[{ required: true }]}>
              <CheckpointSelectBox />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item name="taskDate" label="Tgl Task" rules={[{ required: true }]} initialValue={moment()}>
              <DatePicker className="full-width" />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item name="lambungNo" label="No Lambung">
              <Input />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item name="awb" label="CRF">
              <Input />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item name="deliveryOrderNo" label="DO No">
              <Input />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item name="netto" label="Netto" rules={[{ type: "number" }]}>
              <InputNumber className="full-width" type="number" />
            </Form.Item>
          </Col>

          {task.detail && task.detail.length > 0 ? (
            <>
              <Col md={12}>
                <Form.Item label="CRF Proof">
                  <a href={process.env.REACT_APP_API_SITE + "/" + task.detail[1].photo} target="_blank" rel="noreferrer noopener">
                    <img src={process.env.REACT_APP_API_SITE + "/" + task.detail[1].photo} className="foto detail" width="400" />
                  </a>
                </Form.Item>
              </Col>

              <Col md={12}>
                <Form.Item label="Delivery Proof">
                  <a href={process.env.REACT_APP_API_SITE + "/" + task.detail[3].photo} target="_blank" rel="noreferrer noopener">
                    <img src={process.env.REACT_APP_API_SITE + "/" + task.detail[3].photo} className="foto detail" width="400" />
                  </a>
                </Form.Item>
              </Col>
            </>
          ) : null}
        </Row>

        <Form.Item name="status" label="Status">
          <Select>
            <Select.Option value="ACTIVE">ACTIVE</Select.Option>
            <Select.Option value="FINISHED">FINISHED</Select.Option>
          </Select>
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Edit
        </Button>
      </Form>

      <br />
      {task.detail && (
        <>
          <h3>Task Detail</h3>
          <Table size="small" rowKey="id" pagination={false} dataSource={task.detail} columns={detailColumns} />
        </>
      )}
    </div>
  );
}

export default TaskUpdate;
