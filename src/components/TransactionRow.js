import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Style.css";
import "./Dashboard.css";

const TransactionRow = ({
  data,
  isDarkMode,
  handleEdit,
  handleDelete,
  handleExpandDescription,
  expandedDescription,
  formatData,
  formatDate,
  formatBalance,
}) => {


    const isHighlighted = new Date(data.date.substring(0, 10)) < new Date().setHours(0, 0, 0, 0);

  return (
    <tr className={isHighlighted ? "highlight" : ""}>
    <td>{data.id}</td>
    <td>
      <span
        className="descriptionText"
        onClick={() => handleExpandDescription(data.id)}
      >
          {expandedDescription === data.id
            ? data.description
            : formatData(data.description)}
        </span>
      </td>
      <td>{data.amount}</td>
      <td>{formatDate(data.date)}</td>
      <td>{formatBalance(data.balance)}</td>
      <td>
        <FontAwesomeIcon
          icon={faPencilAlt}
          className={`editIcon1 ${isDarkMode ? "dark" : "light"}`}
          onClick={() => handleEdit(data)}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={`deleteIcon1 ${isDarkMode ? "dark" : "light"}`}
          onClick={() => handleDelete(data.account_id, data.id)}
        />
      </td>
    </tr>
  );
};

export default TransactionRow;