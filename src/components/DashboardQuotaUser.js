import React, { useState, useEffect } from "react";
import { api } from "helpers";
import { message, Table, Button, Modal, Form, Input } from "antd";
import { FileSearchOutlined, SettingOutlined } from "@ant-design/icons";
import { checkPermission, Guard } from "./Guard";
import ModalHistoryLog from "./ModalHistoryLog";

const Features = [
  { code: "VERIFY_BASIC_ID", name: "Basic ID Verification" },
  { code: "VERIFY_PROF_ID", name: "Professional ID Verification" },
  { code: "VERIFY_PHONE", name: "Phone Verify" },
  { code: "VERIFY_PHONE_EXTRA", name: "Phone Verify Extra" },
  { code: "VERIFY_PHONE_ACTIVE", name: "Phone Verify Active" },
];

function DashboardQuotaUser({ period, companyId }) {
  const [quotas, setQuotas] = useState([]);
  const [updateQuotaUser, setUpdateQuotaUser] = useState({});
  const [modalUpdateQuota, setModalUpdateQuota] = useState(false);

  const [modalLog, setModalLog] = useState(false);
  const [historyId, setHistoryId] = useState(null);

  const [formUpdateQuota] = Form.useForm();

  const historyColumn = [
    { key: "version", dataIndex: "version", title: "Version" },
    { key: "featureCode", dataIndex: "featureCode", title: "Feature Code" },
    { key: "quota", dataIndex: "quota", title: "Quota" },
    { key: "remark", dataIndex: "remark", title: "Remark" },
  ];

  const quotaColumn = [
    { title: "Email", key: "email", dataIndex: "email" },
    {
      title: "Verify Basic ID",
      key: "vbid",
      render: (v, r) => (r.VERIFY_BASIC_ID ? `${r.VERIFY_BASIC_ID.total} / ${r.VERIFY_BASIC_ID.quota}` : 0),
    },
    {
      title: "Verify Pro ID",
      key: "vbid",
      render: (v, r) => (r.VERIFY_PROF_ID ? `${r.VERIFY_PROF_ID.total} / ${r.VERIFY_PROF_ID.quota}` : 0),
    },
    { title: "Verify Phone", key: "vbid", render: (v, r) => (r.VERIFY_PHONE ? `${r.VERIFY_PHONE.total} / ${r.VERIFY_PHONE.quota}` : 0) },
    {
      title: "Verify Phone Ext",
      key: "vbid",
      render: (v, r) => (r.VERIFY_PHONE_EXTRA ? `${r.VERIFY_PHONE_EXTRA.total} / ${r.VERIFY_PHONE_EXTRA.quota}` : 0),
    },
    {
      title: "Verify Phone Age",
      key: "vbid",
      render: (v, r) => (r.VERIFY_PHONE_ACTIVE ? `${r.VERIFY_PHONE_ACTIVE.total} / ${r.VERIFY_PHONE_ACTIVE.quota}` : 0),
    },
    {
      title: "Action",
      key: "action",
      render: (v, r) => (
        <span>
          <Guard action="EDIT_USER_QUOTA">
            <Button type="primary" onClick={() => selectUserEdit(r)}>
              <SettingOutlined /> Quota
            </Button>
          </Guard>
          &nbsp;
          <Guard action="READ_HISTORY_USER">
            <Button
              onClick={() => {
                console.log("clicked");
                setHistoryId(r.id);
                setModalLog(true);
              }}
            >
              <FileSearchOutlined /> Logs
            </Button>
          </Guard>
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchQuotas();
  }, [period]);

  function fetchQuotas() {
    api
      .get(`/v1/dashboard/quota`, {
        params: {
          period: period.format("YYYYMM"),
          companyId: companyId || null,
        },
      })
      .then((res) => setQuotas(res.data))
      .catch((err) => message.error(err.response.data.message));
  }

  function selectUserEdit(r) {
    setUpdateQuotaUser(r);
    formUpdateQuota.setFieldsValue(
      Features.reduce(
        (p, c) => ({
          ...p,
          [c.code]: r[c.code].quota,
        }),
        {},
      ),
    );
    formUpdateQuota.setFieldsValue({ email: r.email });
    setModalUpdateQuota(true);
  }

  function closeEditUserQuota() {
    setUpdateQuotaUser({});
    formUpdateQuota.resetFields();
    setModalUpdateQuota(false);
  }

  function updateQuota(values) {
    api
      .post(`/v1/user/update-quota`, values)
      .then((res) => {
        message.success("Success update user quota");
        closeEditUserQuota();
        fetchQuotas();
      })
      .catch((err) => message.error(err.response.data.message));
  }
  return (
    <>
      <Table
        pagination={false}
        rowKey="email"
        size="small"
        columns={quotaColumn}
        dataSource={quotas}
        summary={
          checkPermission("DASHBOARD_ADMIN")
            ? null
            : (data) => {
                let total = {
                  VERIFY_BASIC_ID_QUOTA: 0,
                  VERIFY_BASIC_ID_TOTAL: 0,
                  VERIFY_PROF_ID_QUOTA: 0,
                  VERIFY_PROF_ID_TOTAL: 0,
                  VERIFY_PHONE_QUOTA: 0,
                  VERIFY_PHONE_TOTAL: 0,
                  VERIFY_PHONE_EXTRA_QUOTA: 0,
                  VERIFY_PHONE_EXTRA_TOTAL: 0,
                  VERIFY_PHONE_ACTIVE_QUOTA: 0,
                  VERIFY_PHONE_ACTIVE_TOTAL: 0,
                };

                data.forEach((d) => {
                  if (d.VERIFY_BASIC_ID) {
                    total.VERIFY_BASIC_ID_QUOTA += d.VERIFY_BASIC_ID.quota;
                    total.VERIFY_BASIC_ID_TOTAL += d.VERIFY_BASIC_ID.total;
                  }
                  if (d.VERIFY_PROF_ID) {
                    total.VERIFY_PROF_ID_QUOTA += d.VERIFY_PROF_ID.quota;
                    total.VERIFY_PROF_ID_TOTAL += d.VERIFY_PROF_ID.total;
                  }
                  if (d.VERIFY_PHONE) {
                    total.VERIFY_PHONE_QUOTA += d.VERIFY_PHONE.quota;
                    total.VERIFY_PHONE_TOTAL += d.VERIFY_PHONE.total;
                  }
                  if (d.VERIFY_PHONE_EXTRA) {
                    total.VERIFY_PHONE_EXTRA_QUOTA += d.VERIFY_PHONE_EXTRA.quota;
                    total.VERIFY_PHONE_EXTRA_TOTAL += d.VERIFY_PHONE_EXTRA.total;
                  }
                  if (d.VERIFY_PHONE_ACTIVE) {
                    total.VERIFY_PHONE_ACTIVE_QUOTA += d.VERIFY_PHONE_ACTIVE.quota;
                    total.VERIFY_PHONE_ACTIVE_TOTAL += d.VERIFY_PHONE_ACTIVE.total;
                  }
                });

                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell>
                      <strong>Total</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <strong>
                        {total.VERIFY_BASIC_ID_TOTAL} / {total.VERIFY_BASIC_ID_QUOTA}
                      </strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <strong>
                        {total.VERIFY_PROF_ID_TOTAL} / {total.VERIFY_PROF_ID_QUOTA}
                      </strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <strong>
                        {total.VERIFY_PHONE_TOTAL} / {total.VERIFY_PHONE_QUOTA}
                      </strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <strong>
                        {total.VERIFY_PHONE_EXTRA_TOTAL} / {total.VERIFY_PHONE_EXTRA_QUOTA}
                      </strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <strong>
                        {total.VERIFY_PHONE_ACTIVE_TOTAL} / {total.VERIFY_PHONE_ACTIVE_QUOTA}
                      </strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }
        }
      />
      {modalLog && historyId ? (
        <ModalHistoryLog
          onClose={() => {
            setModalLog(false);
            setHistoryId(null);
          }}
          width={960}
          columns={historyColumn}
          visible={modalLog}
          name="user-quota"
          id={historyId}
        />
      ) : null}
      <Modal visible={modalUpdateQuota} onCancel={closeEditUserQuota} onOk={() => formUpdateQuota.submit()}>
        <Form layout="vertical" form={formUpdateQuota} onFinish={updateQuota}>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>

          {Features.map((feature) => (
            <Form.Item key={feature.name} label={feature.name} name={feature.code} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ))}

          <Form.Item name="remark" label="Remark" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default DashboardQuotaUser;
