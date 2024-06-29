// script.js

// Sample data
const products = [
    { name: 'Staple Pin Pack', price: 125, cost: 80, stock: 20 },
    { name: 'Apsara Eraser Pack', price: 60, cost: 40, stock: 20 },
    { name: 'Pencil Sharpener Box', price: 57, cost: 35, stock: 20 },
    { name: 'Transparent Scale', price: 10, cost: 5, stock: 20 },
    { name: 'Roller Ball Point Pen', price: 25, cost: 15, stock: 20 },
    { name: 'Drawing Pencils', price: 20, cost: 10, stock: 20 },
    { name: 'Mechanical Pencil', price: 62, cost: 40, stock: 20 },
    { name: 'Drawing Instrument Box', price: 160, cost: 120, stock: 20 },
];

// Generate random sales and profit data
products.forEach(product => {
    product.sold = Math.floor(Math.random() * (product.stock + 1)); // Sold items cannot exceed stock
    product.profit = (product.price - product.cost) * product.sold;
});

let totalSales = 0;
let totalProfit = 0;
let totalStock = 0;
let totalRevenue = 0;

// Function to calculate totals
function calculateTotals() {
    totalSales = products.reduce((acc, product) => acc + product.sold, 0);
    totalProfit = products.reduce((acc, product) => acc + product.profit, 0);
    totalStock = products.reduce((acc, product) => acc + (product.stock - product.sold), 0);
    totalRevenue = products.reduce((acc, product) => acc + (product.price * product.sold), 0);
}

// Function to create charts
function createCharts() {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const profitCtx = document.getElementById('profitChart').getContext('2d');
    const stockCtx = document.getElementById('stockChart').getContext('2d');
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');

    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: products.map(product => product.name),
            datasets: [{
                label: 'Product Sales',
                data: products.map(product => product.sold),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const product = products[index];
                            return `${product.name}: ${context.raw} units sold`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutBounce'
            }
        }
    });

    new Chart(profitCtx, {
        type: 'line',
        data: {
            labels: products.map(product => product.name),
            datasets: [{
                label: 'Profit',
                data: products.map(product => product.profit),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const product = products[index];
                            return `${product.name}: ₹${context.raw.toFixed(2)} profit`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutBounce'
            }
        }
    });

    new Chart(stockCtx, {
        type: 'pie',
        data: {
            labels: products.map(product => product.name),
            datasets: [{
                label: 'Remaining Stock',
                data: products.map(product => product.stock - product.sold),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const product = products[index];
                            return `${product.name}: ${context.raw} units remaining`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutBounce'
            }
        }
    });

    new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: products.map(product => product.name),
            datasets: [{
                label: 'Revenue',
                data: products.map(product => product.price * product.sold),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const product = products[index];
                            return `${product.name}: ₹${context.raw.toFixed(2)} revenue`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutBounce'
            }
        }
        });
        }
        
        // Initialize dashboard
        calculateTotals();
        createCharts();