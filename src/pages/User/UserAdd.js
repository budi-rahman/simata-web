import React from "react";
import { Button, Form, Input, message, Select } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";
import CompanySelectBox from "components/SelectBox/CompanySelectBox";

function UserAdd({ history }) {
  const [form] = Form.useForm();

  function onFormFinish(payload) {
    let { companyId, role } = form.getFieldsValue();
    if (role === "COMPANY_USER" && !companyId) {
      return message.error("Wajib pilih company/perusahaan");
    }
    api
      .post("/v1/user", payload)
      .then((res) => {
        message.success("Berhasil menambahkan user");
        history.push("/user");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal menambahkan user")));
  }
  return (
    <div>
      <h2>Tambah User</h2>
      <Form layout="vertical" form={form} onFinish={onFormFinish}>
        <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="companyId" label="Company">
          <CompanySelectBox />
        </Form.Item>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="ktp" label="KTP" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="simper" label="Simper *apabila lebih dari satu, dipisah menggunakan koma (,)" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="phone" label="No HP" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" initialValue="DRIVER_USER" rules={[{ required: true }]}>
          <Select>
            {["SUPER_ADMIN", "DRIVER_USER", "SCANNER_USER", "COMPANY_USER"].map((role) => (
              <Select.Option key={role} value={role}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Tambah
        </Button>
      </Form>
    </div>
  );
}

export default UserAdd;
