import React, { useEffect, useState } from "react";
import { api } from "helpers";
import { Button, message, Table } from "antd";
import getBy from "lodash/get";
import { Link } from "react-router-dom";
import { checkPermission } from "components/Guard";

function Fleet() {
  const [fleets, setFleets] = useState([]);
  const columns = [
    { key: "companyName", dataIndex: ["company", "name"], title: "Nama Perusahaan" },
    { key: "licensePlate", dataIndex: "licensePlate", title: "Plat Nomor" },
    { key: "type", dataIndex: "type", title: "Tipe" },
    { key: "gatePass", dataIndex: "gatePass", title: "Gate Pass" },
    { key: "status", dataIndex: "status", title: "Status" },
    {
      key: "action",
      render: (v, r) => (
        <span>
          <Link to={`/fleet/${r.id}`}>Edit</Link>
        </span>
      ),
    },
  ];

  useEffect(() => {
    getFleets();
  }, []);

  function getFleets() {
    api
      .get("/v1/fleet")
      .then((res) => {
        setFleets(res.data);
      })
      .catch((err) => {
        message.error(getBy(err, "response.data.message", "Gagal mendapatkan Fleet"));
      });
  }
  return (
    <div>
      <h2>Fleet</h2>
      <span>
        {checkPermission("fleet-admin") && (
          <Link to="/fleet/add">
            <Button type="primary">Tambah</Button>
          </Link>
        )}
      </span>
      <br />
      <br />
      <Table size="small" rowKey="id" columns={columns} dataSource={fleets} />
    </div>
  );
}

export default Fleet;
