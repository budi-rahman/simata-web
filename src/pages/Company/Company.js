import React, { useEffect, useState } from "react";
import { api } from "helpers";
import { message, Table, Button } from "antd";
import getBy from "lodash/get";
import { Link } from "react-router-dom";

function Company() {
  const [companies, setCompanies] = useState([]);
  const columns = [
    { key: "name", dataIndex: "name", title: "Nama" },
    { key: "ownerName", dataIndex: "ownerName", title: "Nama Pemilik" },
    { key: "phone", dataIndex: "phone", title: "No HP" },
    { key: "status", dataIndex: "status", title: "Status" },
    {
      key: "company",
      render: (v, r) => (
        <span>
          <Link to={`/company/${r.id}`}>Edit</Link>
        </span>
      ),
    },
  ];

  useEffect(() => {
    getCompanies();
  }, []);

  function getCompanies() {
    api
      .get("/v1/company")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        message.error(getBy(err, "response.data.message", "Gagal mendapatkan Perusahaan"));
      });
  }
  return (
    <div>
      <h2>Company</h2>
      <span>
        <Link to="/company/add">
          <Button type="primary">Tambah</Button>
        </Link>
      </span>
      <br />
      <br />
      <Table size="small" rowKey="id" columns={columns} dataSource={companies} />
    </div>
  );
}

export default Company;
