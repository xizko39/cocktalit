import { html } from 'lit-html';
import { component, useState } from 'haunted';
import './search-bar.js';
import './cocktail-list.js';
import './shopping-list.js';
import './toast-message.js';
import './styles.css';

function CocktailApp() {
    const [cocktails, setCocktails] = useState([]);
    const [shoppingList, setShoppingList] = useState(new Set());
    const [toastMessage, setToastMessage] = useState('');
    const [hasResults, setHasResults] = useState(false); // Track if there are search results

    const searchCocktails = async (query) => {
        try {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
            );
            const data = await response.json();
            setCocktails(data.drinks || []);
            setHasResults(data.drinks && data.drinks.length > 0); // Update hasResults based on search results
            setToastMessage(data.drinks ? 'Here are the results.' : 'No results found.');
        } catch (error) {
            console.error('Error fetching cocktails:', error);
            setToastMessage('Error fetching cocktails.');
        }
    };

    const addToShoppingList = (ingredients) => {
        setShoppingList(new Set([...shoppingList, ...ingredients]));
        setToastMessage('Ingredients added to shopping list.');
    };

    const removeFromShoppingList = (ingredient) => {
        const newList = new Set(shoppingList);
        newList.delete(ingredient);
        setShoppingList(newList);
        setToastMessage('Ingredient removed from shopping list.');
    };

    return html`
        <div class="cocktail-app">
            <search-bar @search=${(e) => searchCocktails(e.detail)}></search-bar>
            <div style="display: flex; width: 100%;">
                <div style="flex: 0 0 70%;"> 
                    <cocktail-list 
                        .cocktails=${cocktails}
                        @add-to-list=${(e) => addToShoppingList(e.detail)}
                    ></cocktail-list>
                </div>
                
                ${hasResults 
                    ? html`<div style="flex: 0 0 30%;"> 
                        <shopping-list
                            .items=${Array.from(shoppingList).map(item => ({ ingredient: item, quantity: 1 }))}
                            .isEmpty=${shoppingList.size === 0}
                            @remove-item=${(e) => removeFromShoppingList(e.detail)}
                        ></shopping-list>
                    </div>`
                    : ''
                }
            </div>
            <toast-message .message=${toastMessage} .visible=${!!toastMessage}></toast-message>
        </div>
    `;
}

customElements.define('cocktail-app', component(CocktailApp));
