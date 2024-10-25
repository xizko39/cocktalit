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
        border: none;
        border-radius: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
        font-size: 1rem;
        outline: none;
      }

      input:focus {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }

      button {
        padding: 12px 24px;
        background: #2D3250;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        font-weight: bold;
      }

      button:hover {
        background: #1e2538;
        transform: scale(1.05);
      }
    </style>
    <form @submit=${handleSubmit}>
      <input 
        type="text"
        .value=${query}
        @input=${(e) => setQuery(e.target.value)}
        placeholder="Search cocktails..."
      />
      <button type="submit">Search</button>
    </form>
  `;
}

customElements.define('search-bar', component(SearchBar));
