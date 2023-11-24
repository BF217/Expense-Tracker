import React from 'react';
import { Card } from 'react-bootstrap';

const TotalAmount = ({ total }) => {
  return (
    <Card className="mt-3">
      <Card.Header>Total Expenses</Card.Header>
      <Card.Body>
        <Card.Title>Total Amount</Card.Title>
        <Card.Text>£{total.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TotalAmount;
