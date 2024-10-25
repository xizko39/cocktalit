import { html } from 'lit-html';
import { component } from 'haunted';

function ToastMessage({ message, visible }) {
    return html`
        <style>
            .toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #333;
                color: #fff;
                padding: 16px 24px;
                border-radius: 8px;
                opacity: ${visible ? '1' : '0'};
                transition: opacity 0.5s ease, transform 0.3s ease;
                z-index: 1000;
                transform: ${visible ? 'translateY(0)' : 'translateY(20px)'};
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }

            .toast.show {
                animation: slideIn 0.5s forwards, fadeOut 0.5s forwards 2.5s; /* Add animation */
            }

            @keyframes slideIn {
                0% {
                    transform: translateY(20px);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes fadeOut {
                0% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                }
            }
        </style>
        <div class="toast ${visible ? 'show' : ''}">
            ${message}
        </div>
    `;
}

customElements.define('toast-message', component(ToastMessage));
