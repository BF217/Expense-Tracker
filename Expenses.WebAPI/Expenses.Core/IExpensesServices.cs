﻿using System.Collections.Generic;
using Expenses.DB;

namespace Expenses.Core
{
    public interface IExpensesServices
    {
        List<Expense> GetExpenses();
        Expense GetExpense(int id);
        Expense CreateExpense(Expense expense);
        void DeleteExpense(Expense expense);
        Expense EditExpense(Expense expense);
    }
}
