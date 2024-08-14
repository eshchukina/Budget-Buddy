import React from "react";
import MainButton from "../buttons/MainButton";
const TransactionModal = ({
  isDarkMode,
  isModalOpen,
  editData,
  handleSubmit,
  handleDescriptionChange,
  handleTagChange,
  handleAmountChange,
  formatDateForInput,
  formatDateTime,
  setEditData,
  closeModal,
}) => {
  return (
    isModalOpen && (
      <div className="modalWindow">
        <div className={`modalContent ${isDarkMode ? "dark" : "light"}`}>
          <h3>Enter the data</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editData.description}
              onChange={handleDescriptionChange}
              placeholder="description"
            />
            <select
              value={editData.tag}
              onChange={handleTagChange}
              required
              className="tagSelect"
            >
              <option value="other" className="tagOther">
                Select a tag
              </option>
              <option value="food" className="tagFood">
                food
              </option>
              <option value="transport" className="tagTransport">
                transport
              </option>
              <option value="salary" className="tagSalary">
                salary
              </option>
              <option value="health" className="tagHealth">
                health
              </option>
              <option value="pets" className="tagPets">
                pets
              </option>
              <option value="gifts" className="tagGifts">
                gifts
              </option>
              <option value="hobby" className="tagHobby">
                hobby
              </option>
              <option value="entertainment" className="tagEntertainment">
                entertainment
              </option>
              <option value="cloth" className="tagCloth">
                cloth
              </option>
              <option value="moneyBox" className="tagmoneyBox">
                money box
              </option>
              <option value="trips" className="tagTrips">
                trips
              </option>
              <option value="credit" className="tagCredit">
                credit
              </option>
              <option value="other" className="tagOther">
                other
              </option>
            </select>
            <input
              type="number"
              inputMode="decimal"
              value={editData.amount}
              onChange={handleAmountChange}
              placeholder="amount"
            />
            <input
              type="date"
              value={editData.date ? formatDateForInput(editData.date) : ""}
              onChange={(e) => {
                const selectedDate = e.target.value;
                const formattedDate = formatDateTime(selectedDate);
                setEditData({ ...editData, date: formattedDate });
              }}
              placeholder="date"
            />
            
            <button
              className={`modalBtn ${isDarkMode ? "dark" : "light"}`}
              type="submit"
            >
              Add
            </button>
            <button
              className={`modalBtn ${isDarkMode ? "dark" : "light"}`}
              onClick={closeModal}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default TransactionModal;
