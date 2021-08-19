import React, { useEffect, useState } from "react";
import { message, Select } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";

function FleetSelectBox(props) {
  const [fleets, setFleets] = useState([]);
  useEffect(() => {
    api
      .get("/v1/fleet")
      .then((res) => setFleets(res.data))
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan list fleet")));
  }, []);

  return (
    <Select {...props}>
      {fleets.map((fleet) => (
        <Select.Option key={fleet.id} value={fleet.id}>
          {fleet.licensePlate}
        </Select.Option>
      ))}
    </Select>
  );
}

export default FleetSelectBox;
