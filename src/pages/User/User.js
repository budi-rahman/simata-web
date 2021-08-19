import React, { useEffect, useState } from "react";
import getBy from "lodash/get";
import { api } from "helpers";
import { Button, message, Table } from "antd";
import { Link } from "react-router-dom";
import { checkPermission } from "components/Guard";

function User() {
  const [users, setUsers] = useState([]);
  const columns = [
    { key: "username", dataIndex: "username", title: "Nama User" },
    { key: "ktp", dataIndex: "ktp", title: "KTP" },
    { key: "phone", dataIndex: "phone", title: "Phone" },
    { key: "role", dataIndex: "role", title: "Role" },
    { key: "status", dataIndex: "status", title: "Status" },
    {
      key: "action",
      render: (v, r) => (
        <span>
          {checkPermission("user-admin") && <Link to={`/user/${r.id}`}>Edit</Link>}
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    api
      .get("/v1/user")
      .then((res) => setUsers(res.data))
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal menampilkan data user")));
  }

  return (
    <div>
      <h2>User</h2>
      <span>
        {checkPermission("user-add") && (
          <Link to="/user/add">
            <Button type="primary">Tambah</Button>
          </Link>
        )}
      </span>
      <br />
      <br />
      <Table size="small" rowKey="id" columns={columns} dataSource={users} />
    </div>
  );
}

export default User;
