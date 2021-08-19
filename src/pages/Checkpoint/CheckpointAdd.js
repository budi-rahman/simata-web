import React from "react";
import { Button, Col, Form, Input, InputNumber, message, Row, Select } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";

function CheckpointAdd({ history }) {
  function onFormFinish(payload) {
    api
      .post("/v1/checkpoint", {
        ...payload,
        coordinate: `${payload.lat}|${payload.lng}`,
      })
      .then((res) => {
        message.success("Berhasil menambahkan checkpoint");
        history.push("/checkpoint");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal menambahkan checkpoint")));
  }
  return (
    <div>
      <h2>Tambah Checkpoint</h2>
      <Form layout="vertical" onFinish={onFormFinish}>
        <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Tipe" initialValue="Quarry" rules={[{ required: true }]}>
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
              <InputNumber className="full-width" />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item name="lng" label="Longitude" rules={[{ required: true, type: "number" }]}>
              <InputNumber className="full-width" />
            </Form.Item>
          </Col>
        </Row>

        <Button htmlType="submit" type="primary">
          Tambah
        </Button>
      </Form>
    </div>
  );
}

export default CheckpointAdd;
