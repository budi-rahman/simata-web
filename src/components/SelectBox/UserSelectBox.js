import React, { useEffect, useState } from "react";
import { message, Select } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";

function UserSelectBox(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .get("/v1/user", {
        params: {
          role: props.userRole,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan list user")));
  }, []);

  return (
    <Select {...props}>
      {users.map((user) => (
        <Select.Option key={user.id} value={user.id}>
          {user.username}
        </Select.Option>
      ))}
    </Select>
  );
}

export default UserSelectBox;
