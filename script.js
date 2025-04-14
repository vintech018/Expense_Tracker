// script.js - Enhanced expense tracking functionality
class Expense {
  constructor(id, date, category, description, amount) {
      this.id = id;
      this.date = date;
      this.category = category;
      this.description = description;
      this.amount = amount;
  }
}

class ExpenseTracker {
  constructor() {
      this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      this.categories = JSON.parse(localStorage.getItem('categories')) || 
          ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Other'];
      this.totalBudget = JSON.parse(localStorage.getItem('budget')) || 0;
  }
  
  addExpense(date, category, description, amount) {
      const id = this.expenses.length > 0 ? 
          Math.max(...this.expenses.map(expense => expense.id)) + 1 : 1;
      
      const expense = new Expense(id, date, category, description, amount);
      this.expenses.push(expense);
      this.saveExpenses();
      return expense;
  }
  
  deleteExpense(id) {
      this.expenses = this.expenses.filter(expense => expense.id !== id);
      this.saveExpenses();
  }
  
  updateExpense(id, updatedExpense) {
      const index = this.expenses.findIndex(expense => expense.id === id);
      if (index !== -1) {
          this.expenses[index] = { ...this.expenses[index], ...updatedExpense };
          this.saveExpenses();
          return true;
      }
      return false;
  }
  
  getExpensesByCategory(category) {
      return this.expenses.filter(expense => expense.category === category);
  }
  
  getExpensesByDateRange(startDate, endDate) {
      return this.expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= startDate && expenseDate <= endDate;
      });
  }
  
  getTotalExpenses() {
      return this.expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  }
  
  setBudget(amount) {
      this.totalBudget = amount;
      localStorage.setItem('budget', JSON.stringify(amount));
  }
  
  getRemainingBudget() {
      return this.totalBudget - this.getTotalExpenses();
  }
  
  addCategory(categoryName) {
      if (!this.categories.includes(categoryName)) {
          this.categories.push(categoryName);
          localStorage.setItem('categories', JSON.stringify(this.categories));
          return true;
      }
      return false;
  }
  
  saveExpenses() {
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }
  // Add to script.js
function initializeCharts() {
  renderCategoryChart();
  renderTrendChart();
}

function renderCategoryChart() {
  const categories = expenseTracker.categories;
  const categoryData = categories.map(category => {
      const expenses = expenseTracker.getExpensesByCategory(category);
      return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  });
  
  const ctx = document.getElementById('category-chart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: categories,
          datasets: [{
              data: categoryData,
              backgroundColor: [
                  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
              ]
          }]
      },
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Expenses by Category'
          }
      }
  });
}

function renderTrendChart() {
  // Get last 6 months of data
  const months = [];
  const monthlyExpenses = [];
  const monthlyIncomes = [];
  
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      months.push(monthName);
      
      // Filter expenses for this month
      const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
      const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      
      const monthExpenses = expenseTracker.getExpensesByDateRange(startDate, endDate);
      const totalExpense = monthExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      monthlyExpenses.push(totalExpense);
      
      // Similar calculation for income would go here
      // monthlyIncomes.push(calculatedIncome);
  }
  
  const ctx = document.getElementById('trend-chart').getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: months,
          datasets: [{
              label: 'Expenses',
              data: monthlyExpenses,
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          title: {
              display: true,
              text: 'Monthly Expense Trend'
          }
      }
  });
}
}
