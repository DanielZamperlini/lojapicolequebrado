export class UserManager {
  constructor() {
    this.userName = '';
    this.onUserNameChange = null;
  }

  setUserName(name) {
    this.userName = name;
    localStorage.setItem('userName', name);
    if (this.onUserNameChange) {
      this.onUserNameChange(name);
    }
  }

  getUserName() {
    return this.userName || localStorage.getItem('userName') || '';
  }

  showWelcomeModal() {
    const modalHTML = `
            <div class="welcome-modal" id="welcomeModal">
                <div class="welcome-modal-content">
                    <h2>Bem-vindo à Picolé Quebrado!</h2>
                    <p>Por favor, digite seu nome para continuar:</p>
                    <div class="error-message" id="nameError">Por favor, digite um nome válido.</div>
                    <input type="text" id="userNameInput" placeholder="Seu nome" maxlength="30">
                    <button id="startShoppingBtn">fique á vontade</button>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('welcomeModal');
    const input = document.getElementById('userNameInput');
    const button = document.getElementById('startShoppingBtn');
    const errorMessage = document.getElementById('nameError');

    const validateAndSaveName = () => {
      const name = input.value.trim();
      if (name.length >= 2) {
        this.setUserName(name);
        modal.remove();
      } else {
        errorMessage.style.display = 'block';
        input.focus();
      }
    };

    input.focus();

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        validateAndSaveName();
      }
    });

    button.addEventListener('click', validateAndSaveName);
  }

  init() {
    const savedName = this.getUserName();
    if (!savedName) {
      this.showWelcomeModal();
    } else {
      this.userName = savedName;
      if (this.onUserNameChange) {
        this.onUserNameChange(savedName);
      }
    }
  }
}
