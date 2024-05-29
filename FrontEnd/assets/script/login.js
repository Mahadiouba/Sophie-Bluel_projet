// Regex pour valider un email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex pour valider un mot de passe
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/;

async function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.querySelector(".loginEmail__error");
  const passwordError = document.querySelector(".loginMdp__error");

  // Réinitialiser les messages d'erreur
  emailError.textContent = "";
  passwordError.textContent = "";

  const email = emailInput.value;
  const password = passwordInput.value;
  let isValid = true;

  // Valider l'email
  if (!emailRegex.test(email)) {
    emailError.textContent = "Adresse e-mail invalide";
    isValid = false;
  }

  // Valider le mot de passe
  if (!passwordRegex.test(password)) {
    passwordError.textContent = "Mot de passe invalide.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Envoyer les données de connexion à l'API
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Échec de la connexion");
    }

    const data = await response.json();

    // Vérifier la réponse de l'API
    if (data.token) {
      // Connexion réussie, rediriger ou stocker le token
      console.log("Connexion réussie", data);
      // Exemple : Stocker le token dans le localStorage
      localStorage.setItem("authToken", data.token);
      window.location.href = "admin.html"; // Rediriger vers une autre page après la connexion réussie
    } else {
      throw new Error("Email ou mot de passe incorrect");
    }
  } catch (error) {
    emailError.textContent = error.message;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login__form");
  form.addEventListener("submit", handleLogin);
});
