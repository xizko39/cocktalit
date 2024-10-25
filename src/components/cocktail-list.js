import { html } from 'lit-html';
import { component, useState } from 'haunted';

function CocktailList({ cocktails }) {
  const getIngredients = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  const MAX_TEXT_LENGTH = 170;

  return html`
    <style>
      .cocktail-list {
        display: grid;
        grid-template-columns: repeat(2, 3fr);
        gap: 24px;
        max-width: 700px;
        margin: 0 auto;
      }

      .cocktail-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: #ffffff;
        border-radius: 3px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
        padding: 12px;
        width: 90%;
        margin-right: 74px;
        margin-bottom: 16px;
      }

      .cocktail-item:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }

      .cocktail-item img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 4px;
      }

      .cocktail-item h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #2D3250;
        margin: 4px 0;
      }

      .cocktail-item p {
        font-size: 0.75rem;
        color: #424769;
        margin: 4px 0;
        transition: max-height 0.2s ease-in-out, opacity 0.2s ease-in-out;
        overflow: hidden;
        opacity: 1;
        max-height: 3em;
        flex-grow: 1;
      }

      .cocktail-item p.expanded {
        max-height: 100em;
        opacity: 1;
      }

      .cocktail-item button {
        background: #7077A1;
        color: #ffffff;
        padding: 6px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
        margin-left: auto;
        flex-shrink: 0;
        font-size: 0.75rem;
      }

      .cocktail-item button:hover {
        background: #5b5f8d;
      }

      .toggle-button {
        background: transparent;
        color: #2D3250;
        border: none;
        cursor: pointer;
        text-decoration: underline;
        margin-top: 4px;
        font-size: 0.75rem;
      }

      .add-to-list-button {
        background: transparent;
        border: none;
        cursor: pointer;
        margin-top: 8px;
      }

      .add-to-list-button svg {
        width: 20px;
        height: 20px;
      }
    </style>
    
    <div class="cocktail-list">
      ${cocktails.map(cocktail => {
        const [expanded, setExpanded] = useState(false);
        const isLongText = cocktail.strInstructions.length > MAX_TEXT_LENGTH;

        return html`
          <div class="cocktail-item">
            <img src="${cocktail.strDrinkThumb}/preview" alt="${cocktail.strDrink}">
            <h3>${cocktail.strDrink}</h3>
            <p class=${expanded ? 'expanded' : ''}>
              ${cocktail.strInstructions}
            </p>
            ${isLongText
              ? html`
                  <button class="toggle-button" @click=${() => setExpanded(!expanded)}>
                    ${expanded ? 'Show Less' : 'Show More'}
                  </button>`
              : ''}
            <button class="add-to-list-button" @click=${() => this.dispatchEvent(new CustomEvent('add-to-list', { detail: getIngredients(cocktail) }))} aria-label="Add to Shopping List">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        `;
      })}
    </div>
  `;
}

customElements.define('cocktail-list', component(CocktailList));
