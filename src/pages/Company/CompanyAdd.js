import React from "react";
import { Button, Form, Input, message } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";

function CompanyAdd({ history }) {
  function onFormFinish(payload) {
    api
      .post("/v1/company", payload)
      .then((res) => {
        message.success("Berhasil menambahkan perusahaan/company");
        history.push("/company");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal menambahkan company")));
  }
  return (
    <div>
      <h2>Tambah Company/Perusahaan</h2>
      <Form layout="vertical" onFinish={onFormFinish}>
        <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="ownerName" label="Nama Pemilik" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="No HP" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Alamat" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Tambah
        </Button>
      </Form>
    </div>
  );
}

export default CompanyAdd;
