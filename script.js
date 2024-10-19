// Initialize expenses array from localStorage or empty if not found
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Select form elements
const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

// Function to update the displayed total amount
function updateTotal() {
    const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    totalAmount.textContent = total.toFixed(2);
}

// Function to render the expense list
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
           <span> ${expense.name} - $${expense.amount} - ${expense.category} - ${expense.date || 'N/A'}</span>
            <div class ="button">
            <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
    updateTotal();
}

// Add or Edit Expense
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value || new Date().toISOString().split('T')[0];

    const newExpense = { name, amount, category, date };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    form.reset();
});

// Edit expense function
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-category').value = expense.category;
    document.getElementById('expense-date').value = expense.date;

    // Remove the expense being edited
    expenses.splice(index, 1);
}

// Delete expense function
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Render expenses on page load
renderExpenses();
