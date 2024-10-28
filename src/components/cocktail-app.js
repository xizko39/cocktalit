import { html } from 'lit-html';
import { component, useState } from 'haunted';
import './search-bar.js';
import './cocktail-list.js';
import './shopping-list.js';
import './toast-message.js';

function CocktailApp() {
    const [cocktails, setCocktails] = useState([]);
    const [shoppingList, setShoppingList] = useState([]); // Use an array for easier re-rendering
    const [toastMessage, setToastMessage] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const searchCocktails = async (query) => {
        try {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
            );
            const data = await response.json();
            setCocktails(data.drinks || []);
            setToastMessage(data.drinks ? 'Here are the results.' : 'No results found.');
        } catch (error) {
            console.error('Error fetching cocktails:', error);
            setToastMessage('Error fetching cocktails.');
        }
    };

    const addToShoppingList = (ingredients) => {
        // Avoid duplicates by filtering out existing ingredients
        const newItems = ingredients.filter(newItem =>
            !shoppingList.some(existingItem => existingItem.ingredient === newItem.ingredient)
        );
        setShoppingList([...shoppingList, ...newItems]); // Update shoppingList with new items
        setToastMessage('Ingredients with measurements added to shopping list.');
        setIsDrawerOpen(true);
    };

    const removeFromShoppingList = (ingredient) => {
        const updatedList = shoppingList.filter(item => item.ingredient !== ingredient);
        setShoppingList(updatedList);
        setToastMessage('Ingredient removed from shopping list.');
    };

    const clearAll = () => {
        setShoppingList([]); // Clear the shopping list by setting it to an empty array
        setToastMessage('Shopping list cleared.');
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const styles = html`
        <style>
            .cocktail-app {
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
            }
            .app-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
            }
            .app-title {
                font-size: 2rem;
                color: #2D3250;
            }
            .shopping-list-toggle {
                background-color: #7077A1;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                cursor: pointer;
            }
            .content-wrapper {
                display: flex;
                gap: 2rem;
            }
            .cocktail-list-wrapper {
                flex: 1;
            }
            .welcome-message {
                text-align: center;
                font-size: 1.5rem;
                color: #424769;
                margin-top: 2rem;
            }
            .welcome-subtext {
                font-size: 1rem;
                color: #7077A1;
                margin-top: 0.5rem;
            }
        </style>
    `;

    return html`
        ${styles}
        <div class="cocktail-app">
            <header class="app-header">
                <h1 class="app-title">Cocktail Search</h1>
                <button class="shopping-list-toggle" @click=${() => setIsDrawerOpen(!isDrawerOpen)}>
                    ${isDrawerOpen ? 'Close' : 'Open'} Shopping List
                </button>
            </header>
            <search-bar @search=${(e) => searchCocktails(e.detail)}></search-bar>
            <div class="content-wrapper">
                <div class="cocktail-list-wrapper"> 
                    ${cocktails.length === 0 ? html`
                        <div class="welcome-message">
                            Welcome to the Cocktail Search!
                            <div class="welcome-subtext">
                                Start by searching for your favorite cocktails.
                            </div>
                        </div>
                    ` : html`
                        <cocktail-list 
                            .cocktails=${cocktails}
                            @add-to-list=${(e) => addToShoppingList(e.detail)}
                        ></cocktail-list>
                    `}
                </div>
            </div>
            <shopping-list
                .items=${shoppingList}
                .isOpen=${isDrawerOpen}
                @remove-item=${(e) => removeFromShoppingList(e.detail)}
                @clear-all=${clearAll}
                @close=${closeDrawer}
            ></shopping-list>
            <toast-message .message=${toastMessage} .visible=${!!toastMessage}></toast-message>
        </div>
    `;
}

customElements.define('cocktail-app', component(CocktailApp));
