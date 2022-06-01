const washCarBtn = document.getElementById('wash-car-btn')
const mowLawnBtn = document.getElementById('mow-lawn-btn')
const pullWeedBtn = document.getElementById('pull-weed-btn')

const clearBtn = document.getElementById('clear-btn')
const note = document.getElementById('note')

const taskContainer = document.getElementById('task-container')
const priceContainer = document.getElementById('price-container')
const total = document.getElementById('total')
total.innerHTML = '$0'

let requestedServices = []
let totalPrice = 0

washCarBtn.addEventListener('click', function() {
   pushAndRender({title:'Wash car',price:10})
})
mowLawnBtn.addEventListener('click', function() {
    pushAndRender({title:'Mow Lawn',price:20})
})
pullWeedBtn.addEventListener('click', function() {
    pushAndRender({title:'Pull weed',price:30})
})
clearBtn.addEventListener('click', () => {
    totalPrice = 0
    total.innerHTML = '$' + totalPrice
    requestedServices = []
    note.textContent = ''
    taskContainer.innerHTML = ''
    priceContainer.innerHTML = ''
})

function pushAndRender(item) {
    let isItemPushed = push(requestedServices, item)
    if (isItemPushed == false) {
        return
    }
    renderArray(requestedServices)
    renderNote()
}
function push(array, item) {
    if (!array.find(arrayItem => arrayItem.title === item.title)) {
      array.push(item)
      return true
    }
    return false
}
function renderArray(array) {
    removeAllItemsFromHtml()
    array.forEach(item => renderItem(item))
}
function renderItem(item) {
    taskContainer.innerHTML += `
        <div class="task">
            <p>${item.title}</p>
            <button onclick="removeFromArrayAndRerender('${item.title}')">Remove</button>
        </div>
    `
    priceContainer.innerHTML += `
    <p><span>$</span>${item.price}</p>
    `
    totalPrice = totalPrice + item.price
    total.innerHTML = '$' + totalPrice
}
function renderNote () {
if (taskContainer.innerHTML != '') {
    note.textContent = 'We accept  cash, credit card, or PayPal'
} else { return }
}
function removeFromArray(itemTitle) {
    for (i = 0; i < requestedServices.length; i++) {
        let item = requestedServices[i]
        if (item.title === itemTitle) {
            requestedServices.splice(i, 1)
            break
        }
    }
}
function removeAllItemsFromHtml() {
    taskContainer.innerHTML = ''
    priceContainer.innerHTML = ''
    totalPrice = 0
    total.innerHTML = '$0'
}
function removeFromArrayAndRerender(itemTitle) {
    removeFromArray(itemTitle)
    removeAllItemsFromHtml()
    renderArray(requestedServices)
}


