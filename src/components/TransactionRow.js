import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faBurger, faCar, faMoneyBill, faHeartPulse, faFaceSmile, faShirt,faPiggyBank, faPaw, faGift, faPalette, faSuitcase, faCreditCard, faOtter } from "@fortawesome/free-solid-svg-icons";

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
  index,
  handleTagChange

}) => {

  const isPositiveAmount = data.balance >= 0;

    const isHighlighted = new Date(data.date.substring(0, 10)) < new Date().setHours(0, 0, 0, 0);


    const categoryIconMap = {
      food: { icon: faBurger, color: "#e96e94" },
      transport: { icon: faCar, color: "#5ec7dd" },
      health: { icon: faHeartPulse, color: "#9ddd5e" },
      pets: { icon: faPaw, color: "#e96e94" },
      gifts: { icon: faGift, color: "#e96e94" },
      hobby: { icon: faPalette, color: "#9ddd5e" },
      trips: { icon: faSuitcase, color: "#5ec7dd" },
      credit: { icon: faCreditCard, color: "#ffcd38" },
      other: { icon: faOtter, color: "#9ddd5e" },

      salary: { icon: faMoneyBill, color: "#ffcd38" },
      entertainment: { icon: faFaceSmile, color: "#ffcd38" },
      cloth: { icon: faShirt, color: "#5ec7dd" },
      // savings: { icon: faPiggyBank, color: "#ffcd38" },
      moneyBox: { icon: faPiggyBank, color: "#ffcd38" },

    };


    return (
      
      <tr className={`transactionRow ${isHighlighted ? "highlight" : ""}`}>
      <td>
        {categoryIconMap[data.tag] && (
          <FontAwesomeIcon
            icon={categoryIconMap[data.tag].icon}
            title={data.tag}
      
            style={{ color: categoryIconMap[data.tag].color }} // Set the color based on the category
          />
          
        )}
      </td>
      <td>
        <span className="descriptionText" onClick={() => handleExpandDescription(data.id)}>
          {expandedDescription === data.id ? data.description : formatData(data.description)}
        </span>
      </td>

     
        <td>{formatBalance(data.amount)}</td>
        <td>{formatDate(data.date)}</td>
        <td
        className={`transactionRow ${
          isPositiveAmount ? "positive" : "negative"
        }`}
      >{formatBalance(data.balance)}</td>
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