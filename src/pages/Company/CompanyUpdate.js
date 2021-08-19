import React, { useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";
import { useParams } from "react-router-dom";

function CompanyUpdate({ history }) {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    getCompanyDetail();
  }, []);

  function getCompanyDetail() {
    api
      .get(`/v1/company/${id}`)
      .then((res) => {
        form.setFieldsValue(res.data);
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan detail company")));
  }

  function onFormFinish(payload) {
    api
      .put(`/v1/company/${id}`, payload)
      .then((res) => {
        message.success("Berhasil mengganti company/perusahaan");
        history.push("/company");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mengganti data company")));
  }
  return (
    <div>
      <h2>Edit Company</h2>
      <Form form={form} layout="vertical" onFinish={onFormFinish}>
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

export default CompanyUpdate;
