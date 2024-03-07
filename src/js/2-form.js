const storageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// функція для читання даних, введених в форму
function readFormData() {
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  return {
    email,
    message,
  };
}

// збереження даних в локальне сховище при введені даних в форму
form.addEventListener('input', event => {
  const data = readFormData();
  event.preventDefault();
  const jsonData = JSON.stringify(data);
  localStorage.setItem(storageKey, jsonData);
});

// при наявності даних в локальному сховищі виводим відразу їх в форму
const rowData = localStorage.getItem(storageKey);
if (rowData) {
  const isData = JSON.parse(rowData);
  if (isData.email) {
    form.email.value = isData.email;
  }
  if (isData.message) {
    form.message.value = isData.message;
  }
}

// якщо всі поля заповнені: очищаєм сховище і форму при відправці форми +виводим дані в консоль
form.addEventListener('submit', event => {
  event.preventDefault();
  if (form.email.value.trim() !== '' && form.message.value.trim() !== '') {
    console.log(readFormData());
    localStorage.removeItem(storageKey);
    form.reset();
  } else {
    return;
  }
});