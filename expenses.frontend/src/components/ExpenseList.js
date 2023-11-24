import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../services/expenses";
import { Button, Row, Col, Container } from 'react-bootstrap';
import ExpenseForm from "./ExpenseForm";
import TotalAmount from "./TotalAmount";

const ExpenseList = () => {
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expensesReducer.expenses);

    useEffect(() => {
        getExpenses(dispatch);
    }, [dispatch]);

    // Calculate the total amount of expenses
    const totalAmount = expenses.reduce((total, currentExpense) => total + Number(currentExpense.amount), 0);

    return (
      <Container>
        {expenses.map(e => (
          <div key={e.id} style={{ marginBottom: '1rem' }}>
            <ListRow expense={e} className = "justify-content-centre align-self-centre w-100" />
          </div>
        ))}
        <TotalAmount total={totalAmount} />
      </Container>
    );
};

const ListRow = ({ expense }) => {
    const [isEditing, setIsEditing] = useState(false);

    return isEditing ? (
      <ExpenseForm  expense={expense} setIsEditing={setIsEditing} />
    ) : (
      <div>
        <Row>
          <Col>{expense.description}</Col>
          <Col>£{expense.amount}</Col>
          <Col>
            <Button variant="warning" onClick={() => setIsEditing(true)}>Edit</Button>
          </Col>
        </Row>
        <hr />
      </div>
    );
};

export default ExpenseList;
