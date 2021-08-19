import React, { useState, useEffect } from "react";
import moment from "moment";
import { Table, message } from "antd";
import { api, thousandSeparator } from "helpers";

function DashboardBillingCompany({ period, companyId }) {
  const [billings, setBillings] = useState([]);

  const billingColumns = [
    { title: "Type", dataIndex: "name", key: "category" },
    { title: "Date", dataIndex: "billingDate", key: "bilingDate", render: (v) => moment(new Date(v)).format("DD-MM-YYYY") },
    { title: "Total", dataIndex: "total", key: "total", render: (v) => thousandSeparator(v) },
    { title: "Balance", dataIndex: "subtotal", key: "subtotal", render: (v) => thousandSeparator(v) },
  ];

  useEffect(() => {
    fetchBillings();
  }, [period]);

  function fetchBillings() {
    api
      .get(`/v1/dashboard/billing`, {
        params: {
          period: period.format("YYYYMM"),
          companyId: companyId || null,
        },
      })
      .then((res) => setBillings(res.data))
      .catch((err) => message.error(err.response.data.message));
  }

  return <Table pagination={false} rowKey={(r) => `${r.category}-${r.day}`} size="small" columns={billingColumns} dataSource={billings} />;
}

export default DashboardBillingCompany;
