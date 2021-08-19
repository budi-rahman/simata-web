import React, { useEffect } from "react";
import { Button, Form, Input, message, Select } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";
import { useParams } from "react-router-dom";
import CompanySelectBox from "components/SelectBox/CompanySelectBox";

function UserUpdate({ history }) {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    getUserDetail();
  }, []);

  function getUserDetail() {
    api
      .get(`/v1/user/${id}`)
      .then((res) => {
        form.setFieldsValue({
          ...res.data,
          password: "",
          simper: res.data.simper && res.data.simper.join(","),
        });
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan detail user")));
  }

  function onFormFinish(payload) {
    api
      .put(`/v1/user/${id}`, payload)
      .then((res) => {
        message.success("Berhasil mengganti user");
        history.push("/user");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mengganti data user")));
  }
  return (
    <div>
      <h2>Edit User</h2>
      <Form form={form} layout="vertical" onFinish={onFormFinish}>
        <Form.Item name="name" label="Nama" required>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username" required>
          <Input disabled />
        </Form.Item>
        <Form.Item name="companyId" label="Company">
          <CompanySelectBox />
        </Form.Item>
        <Form.Item name="password" label="Password *kosongkan apabila tidak ada penggantian password" required>
          <Input.Password />
        </Form.Item>
        <Form.Item name="ktp" label="KTP" required>
          <Input />
        </Form.Item>
        <Form.Item name="simper" label="Simper *apabila lebih dari satu, dipisah menggunakan koma (,)" required>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="phone" label="No HP" required>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" initialValue="DRIVER_USER" required>
          <Select>
            {["SUPER_ADMIN", "DRIVER_USER", "SCANNER_USER", "COMPANY_USER"].map((role) => (
              <Select.Option value={role}>{role}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" required>
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

export default UserUpdate;
