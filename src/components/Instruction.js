import React from "react";
import "./Instruction.css"; 
import "./Style.css";


function Instruction({ isDarkMode }) {


  return (
    <div className={`instruction ${isDarkMode ? "dark" : "light"}`}>
        


             <p> Welcome to the world of financial organization with <span className="highlighName">Budget Buddy</span> - your faithful companion in managing
               finances and achieving financial goals. This is an intuitive and powerful financial application 
               that helps you track your finances, plan expenses, and make informed financial decisions
</p>


<div className={`parent ${isDarkMode ? "dark" : "light"}`}>
<p>


<h3>Multi-currency accounts:</h3>
With Budget Buddy, you have the ability to create an unlimited number of accounts in
 different currencies. 
With Budget Buddy, you will always know the current balance on each of your accounts. But that's 
not all - the app
 also allows you to forecast future balances based on your planned income and expenses
<br/>


 </p>
 
<div className={`one ${isDarkMode ? "dark" : "light"}`}  >

</div>



<p><h3>Transaction management:</h3>
Create, edit, and delete transactions with detailed descriptions and dates. This will help you easily 
analyze where
 your money is going
 <br/> </p>
 <div className={`two ${isDarkMode ? "dark" : "light"}`}  style={{ height: "200px" }}></div>

 
 
 





 <p> <h3>Charts and statistics:</h3>
Visual graphs and charts will help you better understand your finances. Analyze trends, identify
 spending patterns,
 and make informed financial decisions
 <br/> </p>

 <div className={`three ${isDarkMode ? "dark" : "light"}`}  style={{ height: "200px" }}></div>



 
 


 <p><h3>Savings goal:</h3>
Budget Buddy helps you save money for your dreams. Create savings goals with specific targets and
 set portions of your 
income to be automatically transferred to your savings
<br/></p>


<div className={`four ${isDarkMode ? "dark" : "light"}`}  style={{ height: "150px" }}></div>


 



<p><h3>Currency converter:</h3>
With the built-in currency converter, you can easily convert amounts from one currency to another 
without extra effort
</p>

 <div className={`five ${isDarkMode ? "dark" : "light"}`}  style={{ height: "200px" }}></div>



<br/>
</div> 
<p><span className="highlighName">Budget Buddy</span> is your reliable companion in the world of finance. 
First, you need to register!
</p>
<br/><br/>
    
    </div>    
  );
}

export default Instruction;
