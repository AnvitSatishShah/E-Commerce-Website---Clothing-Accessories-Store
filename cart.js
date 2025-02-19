console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}


let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box-' + ob.id
    boxDiv.className = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let quantityDiv = document.createElement('div')
    quantityDiv.className = 'quantity-controls'
    
    let minusButton = document.createElement('button')
    minusButton.innerText = '-'
    minusButton.onclick = function() { updateQuantity(ob.id, -1) }
    
    let quantityDisplay = document.createElement('span')
    quantityDisplay.id = 'quantity-' + ob.id
    quantityDisplay.innerText = itemCounter
    
    let plusButton = document.createElement('button')
    plusButton.innerText = '+'
    plusButton.onclick = function() { updateQuantity(ob.id, 1) }
    
    quantityDiv.appendChild(minusButton)
    quantityDiv.appendChild(quantityDisplay)
    quantityDiv.appendChild(plusButton)
    boxDiv.appendChild(quantityDiv)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: Rs' + ob.price)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    // console.log(boxContainerDiv);

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)

    return cartContainer
}

// Add this function to update the total items display
function updateTotalItemsDisplay() {
    let orderCookie = document.cookie.split(',')[0].split('=')[1];
    let totalItems = 0;
    if (orderCookie && orderCookie.trim() !== '') {
        let orderItems = orderCookie.trim().split(/\s+/);
        totalItems = orderItems.length;
    }
    document.getElementById("totalItem").innerHTML = 'Total Items: ' + totalItems;
    document.getElementById("badge").innerHTML = totalItems;
}

function updateQuantity(itemId, change) {
    let quantityElement = document.getElementById('quantity-' + itemId)
    let currentQuantity = parseInt(quantityElement.innerText)
    let newQuantity = currentQuantity + change

    if (newQuantity > 0) {
        quantityElement.innerText = newQuantity
        
        // Update the cookie with the new quantity
        let orderCookie = document.cookie.split(',')[0].split('=')[1]
        let orderItems = orderCookie.trim().split(/\s+/)
        let updatedOrder = []
        
        // Remove all instances of the current item
        for (let item of orderItems) {
            if (item !== itemId.toString()) {
                updatedOrder.push(item)
            }
        }
        
        // Add the correct number of instances
        for (let i = 0; i < newQuantity; i++) {
            updatedOrder.push(itemId.toString())
        }
        
        document.cookie = "orderId=" + updatedOrder.join(' ') + ",counter=" + updatedOrder.length
        
        // Update the badge
        document.getElementById("badge").innerHTML = updatedOrder.length
        
        // Update the total items display
        updateTotalItemsDisplay()
        
        // Recalculate and update the total amount
        calculateTotal()
    } else {
        // If the new quantity would be 0, remove the item entirely
        removeItem(itemId)
    }
}

function removeItem(itemId) {
    // Remove the item from the DOM
    let itemElement = document.getElementById('box-' + itemId)
    if (itemElement) {
        itemElement.remove()
    }
    
    // Update the cookie
    let orderCookie = document.cookie.split(',')[0].split('=')[1]
    let orderItems = orderCookie.trim().split(/\s+/)
    let updatedOrder = orderItems.filter(item => item !== itemId.toString())
    
    if (updatedOrder.length === 0) {
        // If cart is empty, clear the cookie
        document.cookie = "orderId=,counter=0";
    } else {
        document.cookie = "orderId=" + updatedOrder.join(' ') + ",counter=" + updatedOrder.length;
    }
    
    // Update the badge
    document.getElementById("badge").innerHTML = updatedOrder.length
    
    // Update the total items display
    updateTotalItemsDisplay()
    
    // Recalculate and update the total amount
    calculateTotal()
}

function calculateTotal() {
    let total = 0
    let orderItems = document.cookie.split(',')[0].split('=')[1].split(' ')
    
    for (let i = 0; i < contentTitle.length; i++) {
        let itemCount = orderItems.filter(item => item === contentTitle[i].id.toString()).length
        total += contentTitle[i].price * itemCount
    }
    
    amountUpdate(total)
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.getElementById('toth4') || document.createElement('h4')
    totalh4.id = 'toth4'
    totalh4.innerText = 'Amount: Rs ' + amount
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
    console.log(totalh4);
}


let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = '/orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonTag.onclick = function() {
    console.log("Place order clicked");
    showLoginPopup();
    return false; // Prevent default action
}

// Add these functions at the end of the file

function showLoginPopup() {
    const loginPopup = document.createElement('div');
    loginPopup.id = 'loginPopup';
    loginPopup.innerHTML = `
        <div class="login-content">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Username">
            <input type="password" id="password" placeholder="Password">
            <button onclick="login()">Login</button>
        </div>
    `;
    document.body.appendChild(loginPopup);
}

function hideLoginPopup() {
    const loginPopup = document.getElementById('loginPopup');
    if (loginPopup) {
        loginPopup.remove();
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Anvit' && password === 'Anvit') {
        hideLoginPopup();
        alert('Order placed successfully!');
        proceedToPayment();
    } else {
        alert('Invalid username or password');
    }
}

function proceedToPayment() {
    console.log('Proceeding to payment...');
    clearCart();
    updateCartState();
    window.location.href = '/orderPlaced.html';
}

// BACKEND CALL
let httpRequest = new XMLHttpRequest()
let totalAmount = 0
httpRequest.onreadystatechange = function()
{
    if(this.readyState === 4)
    {
        if(this.status == 200)
        {
            contentTitle = JSON.parse(this.responseText)

            let orderCookie = document.cookie.split(',')[0].split('=')[1];
            if (orderCookie && orderCookie.trim() !== '') {
                let orderItems = orderCookie.trim().split(/\s+/);
                
                // Populate the cart
                for(let i = 0; i < contentTitle.length; i++)
                {
                    let itemCount = orderItems.filter(item => item === contentTitle[i].id.toString()).length;
                    if(itemCount > 0)
                    {
                        dynamicCartSection(contentTitle[i], itemCount);
                    }
                }
                calculateTotal();
            } else {
                // Clear the cart display
                boxContainerDiv.innerHTML = '';
                amountUpdate(0);
            }
            
            // Update total items display here, after checking the cookie
            updateTotalItemsDisplay();
        }
    }
    else
    {
        console.log('call failed!');
    }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
httpRequest.send()

function updateCart() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    cartItemsEl.innerHTML = ""; // Clear cart element
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `...`; // Your existing cart item HTML
    });

    totalEl.innerHTML = `
        <h3>Total Price: ₹ ${totalPrice.toFixed(2)}</h3>
    `;

    // Update the Place Order button state
    const placeOrderBtn = document.querySelector('.btn-purchase');
    if (placeOrderBtn) {
        if (totalPrice === 0 || totalItems === 0) {
            placeOrderBtn.disabled = true;
            placeOrderBtn.classList.add('disabled');
        } else {
            placeOrderBtn.disabled = false;
            placeOrderBtn.classList.remove('disabled');
        }
    }

    // ... (rest of the updateCart function)
}

// Add a function to clear the cart
function clearCart() {
    document.cookie = "orderId=,counter=0";
    boxContainerDiv.innerHTML = '';
    amountUpdate(0);
    updateTotalItemsDisplay();
}

// Add this function to ensure the cart state is updated correctly
function updateCartState() {
    let orderCookie = document.cookie.split(',')[0].split('=')[1];
    let counterCookie = document.cookie.split(',')[1].split('=')[1];
    
    if (orderCookie && orderCookie.trim() !== '') {
        let orderItems = orderCookie.trim().split(/\s+/);
        let totalItems = orderItems.length;
        
        // Update the counter cookie if it doesn't match the actual item count
        if (totalItems !== parseInt(counterCookie)) {
            document.cookie = `orderId=${orderCookie},counter=${totalItems}`;
        }
    } else {
        // If order cookie is empty, reset both cookies
        document.cookie = "orderId=,counter=0";
    }
    
    updateTotalItemsDisplay();
}

// Call updateCartState when the page loads
window.onload = function() {
    updateCartState();
}