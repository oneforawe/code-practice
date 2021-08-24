const input = document.querySelector('#message-input');
const link = document.querySelector('#link-output');
const inputCard = document.querySelector('#input-card');
const linkCard = document.querySelector('#link-card');
const messageCard = document.querySelector('#message-card');
const messageTag = document.querySelector('#message');

const { hash } = window.location;
message = atob(hash.replace('#', ''));
console.log(message);

if (message) {
  messageTag.innerText = message;
  inputCard.classList.add('hide');
  messageCard.classList.remove('hide');
};

document.querySelector('form').addEventListener('submit', event => {
  inputCard.classList.add('hide');
  linkCard.classList.remove('hide');
  event.preventDefault(); // prevent default form submission to backend server
  encrypted = btoa(input.value);
  link.value = `${window.location.origin}${window.location.pathname}#${encrypted}`;
  link.select();
});