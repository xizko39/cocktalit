import { html, component } from 'haunted';

function ShoppingList({ items, isOpen }) {
    const removeItem = (ingredient) => {
        this.dispatchEvent(new CustomEvent('remove-item', { detail: ingredient }));
    };

    const close = () => {
        this.dispatchEvent(new CustomEvent('close'));
    };

    const clearAll = () => {
        // Dispatching a custom event to clear the items
        this.dispatchEvent(new CustomEvent('clear-all'));
    };

    const printList = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Shopping List</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        h1 {
                            color: #2D3250;
                        }
                        .item {
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <h1>Shopping List</h1>
                    <ul>
                        ${items.map(({ ingredient, measure }) => `
                            <li class="item">${ingredient} ${measure ? `- ${measure}` : ''}</li>
                        `).join('')}
                    </ul>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return html`
        <style>
            .shopping-list {
                position: fixed;
                top: 0;
                right: 0;
                width: 380px;
                height: 100vh;
                background-color: #ffffff;
                box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
                transform: translateX(100%);
                transition: transform 0.3s ease-in-out;
                z-index: 1000;
                display: flex;
                flex-direction: column;
            }
            .shopping-list.open {
                transform: translateX(0);
            }
            .shopping-list-header {
                background-color: #7077A1;
                color: white;
                padding: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .header-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .shopping-list-title {
                margin: 0;
                font-size: 1.4rem;
                font-weight: 600;
            }
            .item-count {
                background-color: #ffffff;
                color: #7077A1;
                padding: 0.25rem 0.75rem;
                border-radius: 16px;
                font-size: 0.9rem;
                font-weight: 500;
            }
            .shopping-list-content {
                flex-grow: 1;
                overflow-y: auto;
                padding: 1.5rem;
            }
            .shopping-list-item {
                background-color: #F0F2F5;
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 0.75rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .item-details {
                flex-grow: 1;
            }
            .item-name {
                font-weight: 500;
                color: #2D3250;
                margin-bottom: 0.25rem;
            }
            .item-measure {
                font-size: 0.9rem;
                color: #666;
            }
            .remove-item {
                background-color: #ff4d4d;
                color: white;
                border: none;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                font-size: 1.2rem;
                cursor: pointer;
            }
            .list-actions {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .clear-all-btn, .print-btn {
                background-color: #F0F2F5;
                color: #7077A1;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                width: 100%;
                transition: background-color 0.3s ease;
            }
            .clear-all-btn:hover, .print-btn:hover {
                background-color: #e6e6e6;
            }
            @media (max-width: 480px) {
                .shopping-list {
                    width: 100%;
                }
            }
        </style>

        <div class="shopping-list ${isOpen ? 'open' : ''}">
            <div class="shopping-list-header">
                <div class="header-content">
                    <h2 class="shopping-list-title">Shopping List</h2>
                    <span class="item-count">${items.length}</span>
                </div>
                <button class="close-button" @click=${close}>&times;</button>
            </div>

            <div class="shopping-list-content">
                ${items.length === 0
                    ? html`
                        <div class="empty-list">
                            <span class="empty-icon">🛒</span>
                            <p>Your shopping list is empty.</p>
                            <p>Add ingredients from cocktail recipes!</p>
                        </div>
                    `
                    : html`
                        ${items.map(({ ingredient, measure }) => html`
                            <div class="shopping-list-item">
                                <div class="item-details">
                                    <div class="item-name">${ingredient}</div>
                                    <div class="item-measure">${measure || 'as needed'}</div>
                                </div>
                                <button class="remove-item" @click=${() => removeItem(ingredient)}>
                                    &times;
                                </button>
                            </div>
                        `)}
                    `}
            </div>

            ${items.length > 0 ? html`
                <div class="list-actions">
                    <button class="clear-all-btn" @click=${clearAll}>
                        Clear All Items
                    </button>
                    <button class="print-btn" @click=${printList}>
                        Print Shopping List
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}

customElements.define('shopping-list', component(ShoppingList));
