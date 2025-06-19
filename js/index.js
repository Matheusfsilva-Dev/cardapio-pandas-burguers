document.addEventListener('DOMContentLoaded', () => {
    initializeAddButtons();
});

function addToCart(itemName, itemPrice, extras = []) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const price = parseFloat(itemPrice.replace('R$', '').replace(',', '.'));
    const extrasPrice = extras.reduce((total, extra) => {
        return total + (extra === 'Batata Média com Cheddar e Bacon' ? 20 : 3);
    }, 0);
    cart.push({ name: itemName, price: price + extrasPrice, extras });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

function showExtrasModal(itemName, itemPrice, category) {
    if (category !== 'Lanches') {
        addToCart(itemName, itemPrice);
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Adicionar Extras ao ${itemName}</h3>
            <label><input type="checkbox" name="extra" value="Queijo"> Queijo (+ R$ 3,00)</label>
            <label><input type="checkbox" name="extra" value="Ovo"> Ovo (+ R$ 3,00)</label>
            <label><input type="checkbox" name="extra" value="Cheddar"> Cheddar (+ R$ 3,00)</label>
            <label><input type="checkbox" name="extra" value="Molho Barbecue"> Molho Barbecue (+ R$ 3,00)</label>
            <label><input type="checkbox" name="extra" value="Batata Média com Cheddar e Bacon"> Batata Média com Cheddar e Bacon (+ R$ 20,00)</label>
            <button onclick="submitExtras()">Confirmar</button>
            <button class="cancel" onclick="closeModal()">Cancelar</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    window.submitExtras = function() {
        const checkboxes = modal.querySelectorAll('input[name="extra"]:checked');
        const extras = Array.from(checkboxes).map(cb => cb.value);
        addToCart(itemName, itemPrice, extras);
        closeModal();
    };

    window.closeModal = function() {
        modal.remove();
    };
}

function initializeAddButtons() {
    const buttons = document.querySelectorAll('.item button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const itemElement = button.closest('.item');
            const itemName = itemElement.querySelector('h3').textContent;
            const itemPrice = itemElement.querySelector('.price').textContent;
            const categoryElement = itemElement.closest('.category');
            const category = categoryElement.querySelector('.category-title').textContent.trim();
            showExtrasModal(itemName, itemPrice, category);
        });
    });
}