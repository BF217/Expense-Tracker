﻿using Expenses.Core;
using Expenses.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExpensesController : Controller
    {
        private IExpensesServices _expensesServices;
        public ExpensesController(IExpensesServices ExpensesServices) 
        {
            _expensesServices = ExpensesServices;
        }

        [HttpGet]
        public IActionResult GetExpenses() 
        {
            return Ok(_expensesServices.GetExpenses());
        }

        [HttpGet("{id}", Name = "GetExpense")]
        public IActionResult GetExpense(int id)
        {
            return Ok(_expensesServices.GetExpense(id));
        }

        [HttpPost]
        public IActionResult CreateExpense(Expense expense)
        {
            var newExpense = _expensesServices.CreateExpense(expense);
            return CreatedAtRoute("GetExpense", new { newExpense.Id }, newExpense);
        }

        [HttpDelete]
        public IActionResult DeleteExpense(Expense expense)
        {
            _expensesServices.DeleteExpense(expense);
            return Ok();
        }

        [HttpPut]
        public IActionResult EditExpense(Expense expense)
        {
            return Ok(_expensesServices.EditExpense(expense));
        }
    }
}
