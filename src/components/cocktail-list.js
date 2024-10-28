import { html, component, useState } from 'haunted';

function CocktailList({ cocktails }) {
    const [expandedCards, setExpandedCards] = useState(new Set());

    const addToList = (ingredients) => {
        this.dispatchEvent(new CustomEvent('add-to-list', { detail: ingredients }));
    };

    const toggleInstructions = (id) => {
        const newExpanded = new Set(expandedCards);
        if (expandedCards.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCards(newExpanded);
    };

    return html`
        <style>
            .cocktail-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
                padding: 2rem;
            }
            .cocktail-card {
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                display: flex;
                flex-direction: column;
            }
            .cocktail-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            }
            .cocktail-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            .cocktail-details {
                padding: 1.5rem;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
            }
            .cocktail-name {
                margin: 0 0 1rem;
                font-size: 1.4rem;
                color: #2D3250;
                font-weight: 600;
            }
            .instructions-container {
                margin-bottom: 1rem;
                flex-grow: 1;
            }
            .instructions-text {
                font-size: 0.95rem;
                color: #4A4A4A;
                line-height: 1.6;
                margin: 0;
                transition: all 0.3s ease;
            }
            .instructions-collapsed {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .show-more-btn {
                background: none;
                border: none;
                color: #7077A1;
                cursor: pointer;
                font-size: 0.9rem;
                padding: 0.5rem 0;
                text-decoration: underline;
                margin-top: 0.5rem;
            }
            .show-more-btn:hover {
                color: #5a6084;
            }
            .add-to-list-btn {
                background-color: #7077A1;
                color: white;
                border: none;
                padding: 0.75rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                width: 100%;
                font-size: 1rem;
                transition: background-color 0.3s ease;
                margin-top: auto;
            }
            .add-to-list-btn:hover {
                background-color: #5a6084;
            }
            .ingredients-preview {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin: 1rem 0;
            }
            .ingredient-tag {
                background-color: #F0F2F5;
                color: #2D3250;
                padding: 0.3rem 0.8rem;
                border-radius: 16px;
                font-size: 0.85rem;
            }
        </style>
<div class="cocktail-grid">
            ${cocktails.map(cocktail => {
                const ingredients = Object.keys(cocktail)
                    .filter(key => key.startsWith('strIngredient') && cocktail[key])
                    .map(key => ({
                        ingredient: cocktail[key],
                        measure: cocktail[`strMeasure${key.slice(-1)}`] || 'as needed'
                    }));
                
                const isExpanded = expandedCards.has(cocktail.idDrink);

                return html`
                    <div class="cocktail-card">
                        <img class="cocktail-image" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                        <div class="cocktail-details">
                            <h3 class="cocktail-name">${cocktail.strDrink}</h3>
                            
                            <div class="ingredients-preview">
                                ${ingredients.slice(0, 3).map(item => html`
                                    <span class="ingredient-tag">${item.ingredient} (${item.measure})</span>
                                `)}
                                ${ingredients.length > 3 ? html`
                                    <span class="ingredient-tag">+${ingredients.length - 3} more</span>
                                ` : ''}
                            </div>

                            <div class="instructions-container">
                                <p class="instructions-text ${isExpanded ? '' : 'instructions-collapsed'}">
                                    ${cocktail.strInstructions}
                                </p>
                                ${cocktail.strInstructions.length > 150 ? html`
                                    <button class="show-more-btn" @click=${() => toggleInstructions(cocktail.idDrink)}>
                                        ${isExpanded ? 'Show less' : 'Show more'}
                                    </button>
                                ` : ''}
                            </div>

                            <button class="add-to-list-btn" @click=${() => addToList(ingredients)}>
                                Add to Shopping List
                            </button>
                        </div>
                    </div>
                `;
            })}
        </div>
    `;
}

customElements.define('cocktail-list', component(CocktailList));