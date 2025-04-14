document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return window.location.href = "login.html";
  
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  
    const expenseForm = document.getElementById("expenseForm");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const transactionsList = document.getElementById("transactionsList");
  
    const incomeAmount = document.getElementById("incomeAmount");
    const expenseAmount = document.getElementById("expenseAmount");
    const totalAmount = document.getElementById("totalAmount");
  
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
    let chartInstance;
  
    function saveTransactions() {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  
    function renderTransactions() {
      transactionsList.innerHTML = "";
  
      if (transactions.length === 0) {
        transactionsList.innerHTML = "<li style='color: #888;'>No transactions yet.</li>";
        return;
      }
  
      transactions.slice().reverse().forEach((tx) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${tx.description} <small style="color: #94a3b8;">(${tx.category})</small></span>
          <strong style="color: ${tx.category === 'income' ? '#16a34a' : '#f87171'}">
            ${tx.category === 'income' ? '+' : '-'}₹${Math.abs(tx.amount).toFixed(2)}
          </strong>
        `;
        transactionsList.appendChild(li);
      });
    }
  
    function updateSummaries() {
      let income = 0, expense = 0;
  
      transactions.forEach((tx) => {
        if (tx.category === 'income') income += tx.amount;
        else expense += tx.amount;
      });
  
      const total = income - expense;
  
      incomeAmount.textContent = `₹${income.toFixed(2)}`;
      expenseAmount.textContent = `₹${expense.toFixed(2)}`;
      totalAmount.textContent = `₹${total.toFixed(2)}`;
    }
  
    function updateChart() {
      const categoryTotals = {};
  
      transactions.forEach((tx) => {
        if (tx.category !== 'income') {
          categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
        }
      });
  
      const labels = Object.keys(categoryTotals);
      const data = Object.values(categoryTotals);
  
      const backgroundColors = [
        '#f87171', '#facc15', '#60a5fa', '#a78bfa', '#34d399', '#f472b6'
      ];
  
      if (chartInstance) chartInstance.destroy();
  
      chartInstance = new Chart(document.getElementById("expenseChart"), {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: 'Expenses by Category',
            data,
            backgroundColor: backgroundColors,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: '#e5e7eb' }
            }
          }
        }
      });
    }
  
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const description = descriptionInput.value.trim();
      const amount = parseFloat(amountInput.value.trim());
      const category = categoryInput.value;
  
      if (!description || isNaN(amount) || !category) {
        return alert("Please fill all fields correctly.");
      }
  
      const newTransaction = {
        id: Date.now(),
        description,
        amount: category === "income" ? amount : Math.abs(amount),
        category,
        date: new Date().toISOString()
      };
  
      transactions.push(newTransaction);
      saveTransactions();
      renderTransactions();
      updateSummaries();
      updateChart();
      expenseForm.reset();
    });
  
    // Init
    renderTransactions();
    updateSummaries();
    updateChart();
  });
  