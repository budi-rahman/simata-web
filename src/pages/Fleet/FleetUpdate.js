import React, { useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";
import { useParams } from "react-router-dom";
import CompanySelectBox from "components/SelectBox/CompanySelectBox";
import { checkPermission } from "components/Guard";

function FleetUpdate({ history }) {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    getFleetDetail();
  }, []);

  function getFleetDetail() {
    api
      .get(`/v1/fleet/${id}`)
      .then((res) => {
        form.setFieldsValue(res.data);
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan detail fleet")));
  }

  function onFormFinish(payload) {
    api
      .put(`/v1/fleet/${id}`, payload)
      .then((res) => {
        message.success("Berhasil mengganti fleet");
        history.push("/fleet");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mengganti data fleet")));
  }
  return (
    <div>
      <h2>Edit Fleet</h2>
      <Form form={form} layout="vertical" onFinish={onFormFinish}>
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

export default FleetUpdate;
