import React, { useEffect, useState } from "react";
import { message, Select } from "antd";
import getBy from "lodash/get";
import { api } from "helpers";

function CompanySelectBox(props) {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    api
      .get("/v1/company")
      .then((res) => setCompanies(res.data))
      .catch((err) => message.error(getBy(err, "response.data.message", "Gagal mendapatkan list company")));
  }, []);

  return (
    <Select {...props}>
      {companies.map((company) => (
        <Select.Option key={company.id} value={company.id}>
          {company.name}
        </Select.Option>
      ))}
    </Select>
  );
}

export default CompanySelectBox;
