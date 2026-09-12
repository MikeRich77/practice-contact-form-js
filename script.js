// Validación del formulario de contacto — sin librerías, JavaScript puro.

const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

const fields = {
name: {
input: document.getElementById("name"),
error: document.getElementById("name-error"),
validate: (value) => {
if (value.trim().length === 0) return "El nombre es obligatorio.";
if (value.trim().length < 2) return "El nombre es demasiado corto.";
return "";
},
},
email: {
input: document.getElementById("email"),
error: document.getElementById("email-error"),
validate: (value) => {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (value.trim().length === 0) return "El email es obligatorio.";
if (!emailRegex.test(value.trim())) return "Introduce un email válido.";
return "";
},
},
phone: {
input: document.getElementById("phone"),
error: document.getElementById("phone-error"),
validate: (value) => {
const phoneRegex = /^[0-9+\s]{9,}$/;
if (value.trim().length === 0) return "El teléfono es obligatorio.";
if (!phoneRegex.test(value.trim())) return "Introduce un teléfono válido (mínimo 9 dígitos).";
return "";
},
},
message: {
input: document.getElementById("message"),
error: document.getElementById("message-error"),
validate: (value) => {
if (value.trim().length === 0) return "El mensaje es obligatorio.";
if (value.trim().length < 10) return "Escribe al menos 10 caracteres.";
return "";
},
},
};

function validateField(key) {
const field = fields[key];
const errorMessage = field.validate(field.input.value);

field.error.textContent = errorMessage;
field.input.classList.toggle("invalid", Boolean(errorMessage));

return errorMessage === "";
}

// Valida cada campo en tiempo real mientras el usuario escribe.
Object.keys(fields).forEach((key) => {
fields[key].input.addEventListener("input", () => validateField(key));
});

form.addEventListener("submit", (event) => {
event.preventDefault();
successMessage.hidden = true;

const results = Object.keys(fields).map((key) => validateField(key));
const isFormValid = results.every(Boolean);

if (isFormValid) {
successMessage.hidden = false;
form.reset();
Object.keys(fields).forEach((key) => {
fields[key].input.classList.remove("invalid");
fields[key].error.textContent = "";
});
}
});
