import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import NavBar from "./components/NavBar";

const App = () => (
<> 
  <NavBar />
  <div style={{ width: "60%", margin: "auto" }}>
    <br/>
    <h3>New Expense</h3>
    <ExpenseForm />
    <hr style={{ border: '1px solid grey'}} />
    <h3>Your Expenses</h3>
    <br/> 
    <ExpenseList />
    <hr style={{ border: '1px solid grey'}} /> 
  </div>
  </> 
);

export default App;
