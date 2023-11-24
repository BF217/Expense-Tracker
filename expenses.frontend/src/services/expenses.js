import { ActionCreators } from "../app/expensesReducer";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '',
});

export const getExpenses = async (dispatch) => {
  try {
    //api call
    const { data } = await axiosInstance.get()
    dispatch(ActionCreators.setExpenses(data));
  } catch(err) {
    console.log(err);
  }
};

export const NewExpense = async (dispatch, expense) => {
    try {
        //api call
        const { data } = await axiosInstance.post('', expense);
        dispatch(ActionCreators.newExpense(data));
    } catch(err) {
        console.log(err);
    }
};

export const EditExpense = async (dispatch, expense) => {
    try {
        //api call
        await axiosInstance.put('', expense);
        dispatch(ActionCreators.editExpense(expense));
    } catch(err) {
        console.log(err);
    }
};

export const DeleteExpense = async (dispatch, expense) => {
    try {
        //api call
        console.log("Deleting expense: ", expense);
        await axiosInstance.delete('', { data: {...expense } });
        dispatch(ActionCreators.deleteExpense(expense));
    } catch(err){
        console.log(err);
    }
};