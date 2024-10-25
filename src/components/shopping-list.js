import { html } from 'lit-html';
import { component } from 'haunted';

function ShoppingList({ items }) {
    const printShoppingList = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Shopping List</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        h2 {
                            color: #2D3250;
                            margin-bottom: 20px;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                        }
                        li {
                            margin: 8px 0;
                            display: flex;
                            justify-content: space-between;
                        }
                    </style>
                </head>
                <body>
                    <h2>Shopping List</h2>
                    <ul>
                        ${items.map(item => `<li>${item.ingredient} - Quantity: ${item.quantity}</li>`).join('')}
                    </ul>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return html`
        <style>
            .shopping-list {
                background: #ffffff; 
                border-radius: 12px; 
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); 
                padding: 24px; 
                min-width: 320px; 
                max-width: 400px; 
                margin-left: 20px; 
                position: sticky; 
                top: 20px; 
                z-index: 10; 
                transition: transform 0.2s; 
            }
            .shopping-list h2 {
                font-size: 1.75rem; 
                color: #2D3250; 
                margin-bottom: 16px; 
                font-weight: 600; 
            }
            .shopping-list ul {
                list-style-type: none; 
                padding: 0; 
                margin: 0; 
            }
            .shopping-list li {
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 12px 0; 
                border-bottom: 1px solid #e5e5e5; 
                transition: background-color 0.3s; 
            }
            .shopping-list li:hover {
                background-color: #f5f5f5; 
            }
            .shopping-list button {
                background: #2D3250; 
                color: #ffffff; 
                border: none; 
                border-radius: 8px; 
                padding: 6px 12px; 
                cursor: pointer; 
                font-weight: bold; 
                transition: background-color 0.2s, transform 0.2s; 
            }
            .shopping-list button:hover {
                background: #e65c50; 
                transform: scale(1.05); 
            }
            .print-button {
                background: #2D3250; 
                color: #ffffff; 
                border: none; 
                border-radius: 8px; 
                padding: 10px 20px; 
                cursor: pointer; 
                font-weight: bold; 
                text-align: center; 
                margin-top: 16px; 
                width: 100%; 
                transition: background-color 0.2s, transform 0.2s; 
            }
            .print-button:hover {
                background: #45a049; 
                transform: scale(1.05); 
            }
        </style>
        <div class="shopping-list">
            <h2>Shopping List</h2>
            <ul>
                ${items.map(item => html`
                    <li>
                        ${item.ingredient} - Quantity: ${item.quantity}
                        <button @click=${() => this.dispatchEvent(new CustomEvent('remove-item', { detail: item.ingredient }))}>
                            &times;
                        </button>
                    </li>
                `)}
            </ul>
            <button @click=${printShoppingList} class="print-button">
                Print Shopping List
            </button>
        </div>
    `;
}

customElements.define('shopping-list', component(ShoppingList));
