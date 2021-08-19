import React from "react";
import { Form, Tag } from "antd";

function VerifiedTag({ name, value }) {
  return (
    <Form.Item className="verified-item-result">
      <div className="verified-item-result-height">
        {value === null ? null : value ? <Tag color="green">Verfied {name}</Tag> : <Tag color="red">Not Verified</Tag>}
      </div>
    </Form.Item>
  );
}

export default VerifiedTag;
