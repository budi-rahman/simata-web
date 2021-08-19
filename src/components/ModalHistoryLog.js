import React, { useEffect, useState } from "react";
import moment from "moment";
import { Modal, Table, message } from "antd";
import { api } from "helpers";

function ModalHistoryLog({ onClose, columns, visible, width, name, id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (id) {
      fetchLog();
    }
  }, [id]);

  function fetchLog() {
    api
      .get(`/v1/history-log/${name}/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => message.error(err.response.data.message));
  }
  return (
    <Modal width="960" onCancel={onClose} onOk={onClose} visible={visible}>
      <Table scroll={{ x: width }} size="small" dataSource={data} columns={columns} />
    </Modal>
  );
}

export default ModalHistoryLog;
