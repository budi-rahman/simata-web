import React from "react";
import moment from "moment";
import { Button, DatePicker, Form, message } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";
// import CompanySelectBox from "components/SelectBox/CompanySelectBox";
import UserSelectBox from "components/SelectBox/UserSelectBox";
import FleetSelectBox from "components/SelectBox/FleetSelectBox";
import CheckpointSelectBox from "components/SelectBox/CheckpointSelectBox";

function TaskAdd({ history }) {
  function onFormFinish(payload) {
    api
      .post("/v1/task", payload)
      .then((res) => {
        message.success("Berhasil menambahkan task");
        history.push("/task");
      })
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal menambahkan task")));
  }
  return (
    <div>
      <h2>Tambah Task</h2>
      <Form layout="vertical" onFinish={onFormFinish}>
        <Form.Item name="driverId" label="Pilih Driver" rules={[{ required: true }]}>
          <UserSelectBox userRole="DRIVER_USER" />
        </Form.Item>
        <Form.Item name="fleetId" label="Pilih Kendaraan" rules={[{ required: true }]}>
          <FleetSelectBox />
        </Form.Item>
        {/* <Form.Item name="companyId" label="Perusahaan">
          <CompanySelectBox />
        </Form.Item> */}
        <Form.Item name="pickUpPointId" label="Pilih Jetty" rules={[{ required: true }]}>
          <CheckpointSelectBox />
        </Form.Item>
        <Form.Item name="deliveryPointId" label="Pilih Quarry" rules={[{ required: true }]}>
          <CheckpointSelectBox />
        </Form.Item>
        <Form.Item name="taskDate" label="Tgl Task" rules={[{ required: true }]} initialValue={moment()}>
          <DatePicker className="full-width" />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Tambah
        </Button>
      </Form>
    </div>
  );
}

export default TaskAdd;
