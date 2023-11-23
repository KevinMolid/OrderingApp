import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const totalPriceEl = document.getElementById('total-price')
let totalPrice = 0

const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        id: 1
    },
        {
        name: "Beer",
        ingredients: ["grain", "hops", "yeast", "water"],
        price: 12,
        emoji: "🍺",
        id: 2
    }
]

// Sections
const itemsSection = document.getElementById('items-section')
const orderSection = document.getElementById('order-section')
const orderedItems = document.getElementById('ordered-items')

itemsSection.innerHTML = menuArray.map(function(item){
    return `
    <div class="item-wrapper">
        <h2 class="emoji">${item.emoji}</h1>
        <div class="item-txt">
            <h3>${item.name}</h3>
            <p class="ingredients-txt">${(item.ingredients.join(', '))}</p>
            <p class="price-txt">$${item.price}</p>
        </div>
        <button class="add-item-btn" id="${item.name}-btn">+</button>
    </div>
    `
}).join('')

// Add function to add buttons
menuArray.forEach(function(item){
    const btn = document.getElementById(`${item.name}-btn`)

    btn.addEventListener('click', function(){
        // Update totalPrice
        totalPrice += item.price
        totalPriceEl.innerText = totalPrice

        // Show order Section
        orderSection.style.display = 'block'

        const uuid = uuidv4()
        orderedItems.innerHTML += `
        <div class="order-line">
            <div class="order-line-item">
                <h3>${item.name}</h3>
                <small class="s${item.price}">remove</small>
            </div>
            <p>$<span>${item.price}</span></p>
        </div>
        `
    })
})

// Add event listener to ordered items
document.querySelector('.order-section').addEventListener('click', function(event){
    if (event.target.tagName.toUpperCase() === 'SMALL'){
        const price = event.target.classList[0].slice(1, )
        totalPrice -= price
        totalPriceEl.innerText = totalPrice
        event.target.parentElement.parentElement.innerHTML = ''
    }
})