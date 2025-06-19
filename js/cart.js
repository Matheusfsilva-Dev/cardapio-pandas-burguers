document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const finalizeButton = document.getElementById('finalize-order');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        cartTotal.textContent = 'Total: R$ 0,00';
        if (finalizeButton) {
            finalizeButton.classList.add('disabled');
            finalizeButton.setAttribute('disabled', 'disabled');
        }
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        const extrasText = item.extras && item.extras.length > 0 ? `<p>Extras: ${item.extras.join(', ')}</p>` : '';
        itemElement.innerHTML = `
            <div class="item-details">
                <h3>${item.name}</h3>
                ${extrasText}
                <p class="price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                <button onclick="removeFromCart(${index})">Remover</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    if (finalizeButton) {
        finalizeButton.classList.remove('disabled');
        finalizeButton.removeAttribute('disabled');
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}