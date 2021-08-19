import React, { useEffect } from "react";
import { Button, Form, Input, Row, Col, message, Select, InputNumber } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";
import { useParams } from "react-router-dom";

function CheckpointUpdate({ history }) {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    getCheckpointDetail();
  }, []);

  function getCheckpointDetail() {
    api
      .get(`/v1/checkpoint/${id}`)
      .then((res) => {
        let coor = res.data.coordinate.split("|");
        form.setFieldsValue({
          ...res.data,
          lat: Number(coor[0]),
          lng: Number(coor[1]),
        });
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan detail checkpoint")));
  }

  function onFormFinish(payload) {
    api
      .put(`/v1/checkpoint/${id}`, {
        ...payload,
        coordinate: `${payload.lat}|${payload.lng}`,
      })
      .then((res) => {
        message.success("Berhasil mengganti checkpoint");
        history.push("/checkpoint");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mengganti data checkpoint")));
  }
  return (
    <div>
      <h2>Edit Checkpoint</h2>
      <Form form={form} layout="vertical" onFinish={onFormFinish}>
        <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Tipe" rules={[{ required: true }]}>
          <Select>
            {["Quarry", "Jetty", "Basecamp"].map((v) => (
              <Select.Option key={v} value={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="detail" label="Detail" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col md={12} sm={24}>
            <Form.Item name="lat" label="Latitude" rules={[{ required: true, type: "number" }]}>
              <InputNumber type="number" className="full-width" />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item name="lng" label="Longitude" rules={[{ required: true, type: "number" }]}>
              <InputNumber type="number" className="full-width" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="ACTIVE">ACTIVE</Select.Option>
            <Select.Option value="INACTIVE">INACTIVE</Select.Option>
          </Select>
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Edit
        </Button>
      </Form>
    </div>
  );
}

export default CheckpointUpdate;
