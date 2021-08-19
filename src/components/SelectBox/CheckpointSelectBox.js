import React, { useEffect, useState } from "react";
import { message, Select } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";

function CheckpointSelectBox(props) {
  const [checkpoints, setCheckpoints] = useState([]);
  useEffect(() => {
    api
      .get("/v1/checkpoint")
      .then((res) => setCheckpoints(res.data))
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan list checkpoint")));
  }, []);

  return (
    <Select {...props}>
      {checkpoints.map((checkpoint) => (
        <Select.Option key={checkpoint.id} value={checkpoint.id}>
          {checkpoint.name}
        </Select.Option>
      ))}
    </Select>
  );
}

export default CheckpointSelectBox;
