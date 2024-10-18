
// Function to handle the page navigation
function loadPage(page) {
    switch (page) {
        case 'addProduct':
            window.location.href = 'addCrop.html';  // Navigate to Add Product page
            break;
        case 'orders':
            window.location.href = 'orders.html';  // Navigate to Orders page
            break;
        case 'logout':
           const result= confirm("Are you sure you want to logout");
   
            if(result){
            window.location.href = 'index.html';  // Navigate to Logout page
            alert("You have been loged out successfully! ");
            }
            break;
        default:
            console.error("Invalid page request");
    }
}

// Adding onclick event listeners to each button
document.getElementById('addProductBtn').addEventListener('click', function() {
    loadPage('addProduct');
});

document.getElementById('orderSectionBtn').addEventListener('click', function() {
    loadPage('orders');
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    loadPage('logout');
});



