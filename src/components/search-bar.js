import { html } from 'lit-html';
import { component, useState } from 'haunted';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('search', {
      detail: query
    }));
  };

  return html`
    <style>
      form {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
      }

      input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #2D3250; /* Border color consistent with the app theme */
        border-radius: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        font-size: 1rem;
        outline: none;
        font-family: 'Arial', sans-serif; /* Set font family */
      }

      input:focus {
        border-color: #7077A1; /* Focus border color */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }

      button {
        padding: 12px 24px;
        background: #7077A1; /* Secondary color for consistency */
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        font-weight: bold;
        font-family: 'Arial', sans-serif; /* Set font family */
      }

      button:hover {
        background: #2D3250; /* Change to primary color on hover */
        transform: scale(1.05);
      }

      button:disabled {
        background: #ccc; /* Disabled state */
        cursor: not-allowed;
      }
    </style>
    <form @submit=${handleSubmit}>
      <input 
        type="text"
        .value=${query}
        @input=${(e) => setQuery(e.target.value)}
        placeholder="Search cocktails..."
        required
      />
      <button type="submit" ?disabled=${!query}>Search</button>
    </form>
  `;
}

customElements.define('search-bar', component(SearchBar));
