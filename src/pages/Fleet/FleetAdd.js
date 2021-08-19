import React from "react";
import { Button, Form, Input, message } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";
import CompanySelectBox from "components/SelectBox/CompanySelectBox";
import { checkPermission } from "components/Guard";

function FleetAdd({ history }) {
  function onFormFinish(payload) {
    api
      .post("/v1/fleet", payload)
      .then((res) => {
        message.success("Berhasil menambahkan fleet");
        history.push("/fleet");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal menambahkan fleet")));
  }
  return (
    <div>
      <h2>Tambah Fleet</h2>
      <Form layout="vertical" onFinish={onFormFinish}>
        {checkPermission("fleet-admin") && (
          <Form.Item name="companyId" label="Perusahaan" rules={[{ required: true }]}>
            <CompanySelectBox />
          </Form.Item>
        )}
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="licensePlate" label="Plat No" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gatePass" label="Gate Pass" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Tambah
        </Button>
      </Form>
    </div>
  );
}

export default FleetAdd;
