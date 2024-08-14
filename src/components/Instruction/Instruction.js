import React from "react";
import "./Instruction.css";
import "../Style.css";

function Instruction({ isDarkMode, isInstructionOpen }) {
  const instructionClassName = `instruction ${isDarkMode ? "dark" : "light"} ${
    isInstructionOpen ? "hidden" : ""
  }`;

  return (
    <div className={instructionClassName}>
      <div className={`parent ${isDarkMode ? "dark" : "light"}`}>
        <p>
          Welcome to the world of financial organization with{" "}
          <span className="highlighName">Budget Buddy</span> - your faithful
          companion in managing finances and achieving financial goals. This is
          an intuitive and powerful financial application that helps you track
          your finances, plan expenses, and make informed financial decisions
        </p>

        <p>
          {/* <h3>Multi-currency accounts:</h3> */}
          With Budget Buddy, you have the ability to create an unlimited number
          of accounts in different currencies. With Budget Buddy, you will
          always know the current balance on each of your accounts. But that's
          not all - the app also allows you to forecast future balances based on
          your planned income and expenses
        </p>

        <p>
          {/* <h3>Transaction management:</h3> */}
          Create, edit, and delete transactions with detailed descriptions and
          dates. This will help you easily analyze where your money is going
        </p>

        <p>
          {/* <h3>Charts and statistics:</h3> */}
          Visual graphs and charts will help you better understand your
          finances. Analyze trends, identify spending patterns, and make
          informed financial decisions
        </p>

        <p>
          {/* <h3>Savings goal:</h3> */}
          Budget Buddy helps you save money for your dreams. Create savings
          goals with specific targets and set portions of your income to be
          automatically transferred to your savings
          <br />
        </p>

        <p>
          {/* <h3>Currency converter:</h3> */}
          With the built-in currency converter, you can easily convert amounts
          from one currency to another without extra effort
        </p>

        <p>
          <span className="highlighName">Budget Buddy</span> is your reliable
          companion in the world of finance. First, you need to register!
        </p>

        <div className={`main ${isDarkMode ? "dark" : "light"}`}></div>
      </div>
    </div>
  );
}

export default Instruction;
