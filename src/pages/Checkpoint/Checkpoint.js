import React, { useEffect, useState } from "react";
import { api } from "helpers";
import { Button, message, Table } from "antd";
import getBy from "lodash/get";
import { Link } from "react-router-dom";

function Checkpoint() {
  const [checkpoints, setCheckpoints] = useState([]);
  const columns = [
    { key: "name", dataIndex: "name", title: "Nama" },
    { key: "type", dataIndex: "type", title: "Tipe" },
    { key: "detail", dataIndex: "detail", title: "Detail" },
    { key: "coordinate", dataIndex: "coordinate", title: "Coordinate" },
    { key: "status", dataIndex: "status", title: "Status" },
    {
      key: "action",
      render: (v, r) => (
        <span>
          <Link to={`/checkpoint/${r.id}`}>Edit</Link>
        </span>
      ),
    },
  ];

  useEffect(() => {
    getCheckpoints();
  }, []);

  function getCheckpoints() {
    api
      .get("/v1/checkpoint")
      .then((res) => {
        setCheckpoints(res.data);
      })
      .catch((err) => {
        message.error(getBy(err, "response.data.message", "Gagal mendapatkan Checkpoint"));
      });
  }
  return (
    <div>
      <h2>Checkpoint</h2>
      <span>
        <Link to="/checkpoint/add">
          <Button type="primary">Tambah</Button>
        </Link>
      </span>
      <br />
      <br />
      <Table size="small" columns={columns} dataSource={checkpoints} />
    </div>
  );
}

export default Checkpoint;
