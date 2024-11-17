const STORAGE_KEY = 'website1_shoppingCart';
let checkOutList = [];

// Load cart from localStorage when the page loads
function loadCart() {
  const storedCart = localStorage.getItem(STORAGE_KEY);
  if (storedCart) {
    checkOutList = JSON.parse(storedCart);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkOutList));

}
let count = 0;
// Add item to cart
function addToCart(id) {
  
  const product = ArrProducts.find(item => item.id === id); // Assuming `ArrProducts` is defined

  const existingProduct = checkOutList.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    checkOutList.push({ ...product, quantity: 1 });
  }

  console.log(product);
 
  
          

  saveCart();
  reloadCart(); // Optional: Update cart display if present
  alert(`${product.name} has been successfully added to the cart!`);

  // const quantityElement = document.querySelector('.shoppingBasket .quantity');
}


// Reload cart display
function reloadCart() {
  let subtotal = 0; // Initialize subtotal
  let totalItems = 0;
  const productList = document.querySelector('.productList');
  const quantityElement = document.querySelector('.shoppingBasket .quantity');
  quantityElement.style.display = 'inline'; // Show the quantity element

  // Update the quantity displayed in the shopping basket
   totalItems = checkOutList.reduce((total, item) => total + item.quantity, 0);
  quantityElement.innerText = totalItems;   
  if (!productList) return;

  productList.innerHTML = '';

  checkOutList.forEach((item, key) => {
    let li = document.createElement('li');
    li.innerHTML = `
      <img src='${item.image}' alt="${item.name}">
      <div>${item.name}</div>
      <div>$${item.price}</div>
      <div>
        <button onclick="updateQuantity(${key}, -1)">-</button>
        <div>${item.quantity}</div>
        <button onclick="updateQuantity(${key}, 1)">+</button>
      </div>
    `;
    productList.appendChild(li);
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;
  });
  const totalElement = document.querySelector('.total');
    totalElement.innerHTML = `
      <small>Subtotal (${totalItems} items)</small>$${subtotal.toFixed(2)}
    `;
    // quantityElement.innerText = totalItems;
    if (totalItems === 0) {
      quantityElement.style.display = 'none'; // Hide the quantity if no items in cart
    } else {
      quantityElement.style.display = 'inline'; // Show the quantity if there are items
    }
}

// Update item quantity
function updateQuantity(index, change) {
  if (checkOutList[index].quantity + change > 0) {
    checkOutList[index].quantity += change;
  } else {
    checkOutList.splice(index, 1); // Remove item if quantity goes to 0
  }
  saveCart();
  reloadCart();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  reloadCart(); // Optional: Display cart if the page has a cart section
});

