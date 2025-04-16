document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".tracker-section");
  const form = document.getElementById("expenseForm");
  const transactionTable = document.getElementById("transactionTable");
  const pieChartCanvas = document.getElementById("pieChart");

  let transactions = [];
  let pieChart = null;

  // Section Switcher
  function switchSection(id) {
    sections.forEach(section => {
      section.classList.add("hidden");
      section.classList.remove("active");
    });

    const target = document.getElementById(id);
    if (target) {
      target.classList.remove("hidden");
      target.classList.add("active");

      if (id === "summary") {
        setTimeout(() => updatePieChart(), 150); // Allow canvas to render
      }
    }
  }

  // Attach globally so inline HTML onclick can use it
  window.switchSection = switchSection;
  switchSection("log"); // default section

  // Form Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const [amountInput, categoryInput, descInput, dateInput] = form.elements;

    const transaction = {
      amount: parseFloat(amountInput.value),
      category: categoryInput.value,
      description: descInput.value.trim() || "-",
      date: dateInput.value
    };

    transactions.push(transaction);

    updateTransactionTable();
    form.reset();
    switchSection("history");
  });

  // Update Table
  function updateTransactionTable() {
    transactionTable.innerHTML = "";

    if (transactions.length === 0) {
      transactionTable.innerHTML = "<tr><td colspan='4'>No data yet.</td></tr>";
      return;
    }

    transactions.forEach(t => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${t.date}</td>
        <td>${t.category}</td>
        <td>${t.description}</td>
        <td>₹${t.amount.toFixed(2)}</td>
      `;
      transactionTable.appendChild(row);
    });
  }

  // Update Pie Chart
  function updatePieChart() {
    if (!pieChartCanvas || transactions.length === 0) return;

    const totals = {};

    transactions.forEach(t => {
      if (!totals[t.category]) totals[t.category] = 0;
      totals[t.category] += t.amount;
    });

    const labels = Object.keys(totals);
    const data = Object.values(totals);

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(pieChartCanvas, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Expenses',
          data,
          backgroundColor: [
            '#FFD700', '#B8860B', '#DAA520', '#FFECB3', '#FFF8DC', '#FFC107', '#FFE082'
          ],
          borderColor: '#000',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: document.body.classList.contains('dark-mode') ? '#FFD700' : '#333'
            }
          }
        }
      }
    });
  }
});
