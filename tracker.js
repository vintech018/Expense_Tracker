document.addEventListener("DOMContentLoaded", () => {
  // Main elements
  const buttons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".tracker-section");
  const form = document.getElementById("expenseForm");
  const transactionTable = document.getElementById("transactionTable");
  const pieChartCanvas = document.getElementById("pieChart");
  const searchInput = document.getElementById("searchTransactions");
  const clearButton = document.getElementById("clearHistory");
  
  // Stats elements
  const totalAmountEl = document.getElementById("totalAmount");
  const topCategoryEl = document.getElementById("topCategory");
  const totalTransactionsEl = document.getElementById("totalTransactions");
  const categoryListEl = document.getElementById("categoryList");
  
  // Color palette for categories
  const categoryColors = {
    'Groceries': '#FFD700',
    'Transport': '#DAA520',
    'Food & Dining': '#F4A460',
    'Rent & Utilities': '#D2B48C',
    'Health & Fitness': '#FFDF00',
    'Entertainment': '#FFBF00',
    'Miscellaneous': '#EDC967'
  };
  
  // Initialize state
  let transactions = JSON.parse(localStorage.getItem('bankroll_transactions')) || [];
  let activeSection = "log";
  let pieChart = null;
  
  // Set up button event listeners
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const section = button.getAttribute("data-section");
      switchSection(section);
      
      // Update button state
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
  
  // Section Switcher
  function switchSection(id) {
    activeSection = id;
    
    sections.forEach(section => {
      section.classList.add("hidden");
      section.classList.remove("active");
    });

    const target = document.getElementById(id);
    if (target) {
      target.classList.remove("hidden");
      
      // Use a timeout to ensure the CSS transition works
      setTimeout(() => {
        target.classList.add("active");
      }, 10);

      // Special handling for summary section
      if (id === "summary") {
        setTimeout(() => {
          updateSummaryData();
          updatePieChart();
        }, 150);
      }
    }
  }
  
  // Set default section and active button
  function setDefaultSection() {
    // Set default active button
    const defaultSectionButton = document.querySelector(`.nav-btn[data-section="${activeSection}"]`);
    if (defaultSectionButton) {
      defaultSectionButton.classList.add("active");
    }
    
    // Show default section
    switchSection(activeSection);
  }

  // Save transactions to localStorage
  function saveTransactions() {
    localStorage.setItem('bankroll_transactions', JSON.stringify(transactions));
  }
  
  // Format date to be more readable
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  }
  
  // Format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Form Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = document.getElementById("amount");
    const category = document.getElementById("category");
    const description = document.getElementById("description");
    const date = document.getElementById("date");

    const transaction = {
      id: Date.now(),
      amount: parseFloat(amount.value),
      category: category.value,
      description: description.value.trim() || "-",
      date: date.value
    };

    transactions.push(transaction);
    saveTransactions();
    updateTransactionTable();
    form.reset();
    
    // Show a success notification
    showNotification(`₹${transaction.amount} expense added!`);
    
    // Switch to history section
    switchSection("history");
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.nav-btn[data-section="history"]`).classList.add("active");
  });

  // Show notification toast
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Update Transaction Table
  function updateTransactionTable(filterValue = '') {
    transactionTable.innerHTML = "";

    if (transactions.length === 0) {
      transactionTable.innerHTML = `<tr><td colspan="5" class="empty-state">
        <i class="fas fa-receipt" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <p>No transactions recorded yet.</p>
      </td></tr>`;
      return;
    }
    
    // Filter transactions if search is active
    let displayedTransactions = transactions;
    if (filterValue) {
      const searchTerm = filterValue.toLowerCase();
      displayedTransactions = transactions.filter(t => 
        t.category.toLowerCase().includes(searchTerm) ||
        t.description.toLowerCase().includes(searchTerm) ||
        t.date.includes(searchTerm) ||
        t.amount.toString().includes(searchTerm)
      );
    }
    
    // Show "no results" if filter returns nothing
    if (displayedTransactions.length === 0) {
      transactionTable.innerHTML = `<tr><td colspan="5" class="empty-state">
        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <p>No matching transactions found.</p>
      </td></tr>`;
      return;
    }

    // Sort by date (newest first)
    displayedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display transactions
    displayedTransactions.forEach(t => {
      const row = document.createElement("tr");
      
      // Category color indicator
      const categoryColor = categoryColors[t.category] || '#FFD700';
      
      row.innerHTML = `
        <td>${formatDate(t.date)}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${categoryColor};"></div>
            ${t.category}
          </div>
        </td>
        <td>${t.description}</td>
        <td>${formatCurrency(t.amount)}</td>
        <td>
          <button class="action-btn small" onclick="deleteTransaction(${t.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      transactionTable.appendChild(row);
    });
  }
  
  // Delete transaction
  window.deleteTransaction = function(id) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      const deleted = transactions.splice(index, 1)[0];
      saveTransactions();
      updateTransactionTable(searchInput.value);
      showNotification(`${formatCurrency(deleted.amount)} expense removed`);
      
      // Update summary if it's visible
      if (activeSection === 'summary') {
        updateSummaryData();
        updatePieChart();
      }
    }
  };

  // Clear all transactions
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      if (transactions.length === 0) return;
      
      if (confirm('Are you sure you want to delete all transaction records? This cannot be undone.')) {
        transactions = [];
        saveTransactions();
        updateTransactionTable();
        showNotification('All transactions cleared');
        
        // Update summary if it's visible
        if (activeSection === 'summary') {
          updateSummaryData();
          updatePieChart();
        }
      }
    });
  }
  
  // Filter transactions on search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      updateTransactionTable(e.target.value);
    });
  }

  // Update Summary Data
  function updateSummaryData() {
    if (!totalAmountEl || !topCategoryEl || !categoryListEl || !totalTransactionsEl) return;
    
    // Calculate totals
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    totalAmountEl.textContent = formatCurrency(total);
    totalTransactionsEl.textContent = transactions.length;
    
    // Find top category
    const categoryTotals = {};
    transactions.forEach(t => {
      if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
      categoryTotals[t.category] += t.amount;
    });
    
    let topCategory = 'N/A';
    let topAmount = 0;
    
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      if (amount > topAmount) {
        topAmount = amount;
        topCategory = category;
      }
    });
    
    topCategoryEl.textContent = transactions.length ? `${topCategory} (${formatCurrency(topAmount)})` : 'N/A';
    
    // Create category breakdown
    categoryListEl.innerHTML = '';
    
    if (transactions.length === 0) {
      categoryListEl.innerHTML = `<div class="empty-state">No spending data yet.</div>`;
      return;
    }
    
    // Sort categories by amount (highest first)
    const sortedCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1]);
    
    sortedCategories.forEach(([category, amount]) => {
      const percentage = Math.round((amount / total) * 100);
      const color = categoryColors[category] || '#FFD700';
      
      const categoryItem = document.createElement('div');
      categoryItem.className = 'category-item';
      categoryItem.style.borderLeftColor = color;
      
      categoryItem.innerHTML = `
        <div class="details">
          <div class="name">${category}</div>
          <div class="percent">${percentage}% of total</div>
        </div>
        <div class="amount">${formatCurrency(amount)}</div>
      `;
      
      categoryListEl.appendChild(categoryItem);
    });
  }

  // Update Pie Chart
  function updatePieChart() {
    if (!pieChartCanvas || transactions.length === 0) return;

    const categoryTotals = {};
    
    transactions.forEach(t => {
      if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
      categoryTotals[t.category] += t.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const backgroundColors = labels.map(cat => categoryColors[cat] || '#FFD700');

    if (pieChart) pieChart.destroy();

    // Use the Chart.js library to create a pie chart
    pieChart = new Chart(pieChartCanvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Expenses',
          data,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(0, 0, 0, 0.2)',
          borderWidth: 1,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: document.body.classList.contains('dark-mode') ? '#FFD700' : '#333',
              font: {
                size: 12
              },
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw;
                const total = context.chart.getDatasetMeta(0).total;
                const percentage = Math.round((value / total) * 100);
                return `${formatCurrency(value)} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '60%',
        radius: '90%',
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
  }

  // Initialize app
  setDefaultSection();
  updateTransactionTable();
  
  // Add download PDF functionality
  const downloadButton = document.getElementById("downloadPDF");
  
  if (downloadButton) {
      downloadButton.addEventListener("click", () => {
          if (transactions.length === 0) {
              showNotification("No transactions to download");
              return;
          }
          
          try {
              generatePDF();
          } catch (error) {
              showNotification("Error generating PDF. Please try again.");
              console.error("PDF generation error:", error);
          }
      });
  }
  
  function generatePDF() {
      if (typeof window.jspdf === 'undefined') {
          showNotification("PDF library not loaded. Please refresh the page.");
          return;
      }
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(218, 165, 32); // Golden color
      doc.text("BankRoll Transaction Report", 15, 20);
      
      // Add metadata
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 30);
      doc.text(`Total Transactions: ${transactions.length}`, 15, 35);
      doc.text(`Total Amount: ${formatCurrency(transactions.reduce((sum, t) => sum + t.amount, 0))}`, 15, 40);
      
      // Prepare table data
      const tableData = transactions.map(t => [
          formatDate(t.date),
          t.category,
          t.description,
          formatCurrency(t.amount)
      ]);
      
      // Add table
      doc.autoTable({
          head: [["Date", "Category", "Description", "Amount"]],
          body: tableData,
          startY: 50,
          styles: {
              fontSize: 9,
              cellPadding: 5
          },
          headStyles: {
              fillColor: [218, 165, 32],
              textColor: [0],
              fontStyle: "bold"
          },
          alternateRowStyles: {
              fillColor: [250, 250, 250]
          }
      });
      
      // Save the PDF
      doc.save("bankroll-transactions.pdf");
      
      // Show success notification
      showNotification("PDF downloaded successfully!");
  }
;
  
  // Add CSS for notifications
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #121212;
      color: #FFD700;
      border-left: 4px solid #FFD700;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 1000;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification i {
      color: #FFD700;
      font-size: 1.2rem;
    }
    
    .action-btn.small {
      padding: 5px 10px;
      font-size: 0.85rem;
    }
  `;
  document.head.appendChild(notificationStyles);
  
  // Handle dark mode changes for chart
  document.addEventListener('darkModeChange', () => {
    if (activeSection === 'summary') {
      updatePieChart();
    }
  });
});