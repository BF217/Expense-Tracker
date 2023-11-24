import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { DeleteExpense, EditExpense, NewExpense } from '../services/expenses';

const descriptions = [
  'Groceries',
  'Credit Card',
  'Student Loan',
  'Eating out',
  'Petrol',
  'Other',
];

const ExpenseForm = ({ expense, setIsEditing }) => {
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState(expense?.description || descriptions[0]);
  const [otherDescription, setOtherDescription] = useState('');
  const [isNewExpense, setIsNewExpense] = useState(!expense);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expense) {
      setIsNewExpense(false);
      setAmount(expense.amount);
      setDescription(expense.description);
      if (!descriptions.includes(expense.description)) {
        setDescription('Other');
        setOtherDescription(expense.description);
      }
    } else {
      setIsNewExpense(true);
      setAmount('');
      setDescription(descriptions[0]);
      setOtherDescription('');
    }
  }, [expense]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalDescription = description === 'Other' ? otherDescription : description;
    const payload = { description: finalDescription, amount: parseFloat(amount) || 0 };

    if (isNewExpense) {
      NewExpense(dispatch, payload);
    } else {
      EditExpense(dispatch, { ...payload, id: expense.id });
      setIsEditing(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="descriptionSelect">
            <Form.Label>Description</Form.Label>
            <Form.Control as="select" value={description} onChange={(e) => setDescription(e.target.value)}>
              {descriptions.map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {description === 'Other' && (
            <Form.Group controlId="otherDescriptionInput">
              <Form.Control
              style={{marginTop: "2px"}}
                type="text"
                value={otherDescription}
                onChange={(e) => setOtherDescription(e.target.value)}
                placeholder="Please specify"
              />
            </Form.Group>
          )}
        </Col>
        <Col>
          <Form.Group controlId="amountInput">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </Form.Group>
        </Col>
        <Col style={{ marginTop: 'auto' }}>
          <div>
            {isNewExpense ? (
              <Button variant="primary" type="submit">
                Add
              </Button>
            ) : (
              <div>
                <Button style={{marginRight: '1px'}} variant="danger" onClick={() => DeleteExpense(dispatch, expense)}>
                  Delete
                </Button>
                <Button style={{marginRight: '1px'}} variant="success" type="submit">
                  Save
                </Button>
                <Button style={{marginRight: '1px'}} variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ExpenseForm;
