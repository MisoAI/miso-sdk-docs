const radioGroup = document.querySelector('#layout-radio-group');
radioGroup.addEventListener('change', event => {
  const value = window.selectedLayout = event.target.value;
  window.onSelectLayout && window.onSelectLayout(value);
});
for (const radio of radioGroup.querySelectorAll('input[type="radio"]')) {
  if (radio.checked) {
    window.selectedLayout = radio.value;
    break;
  }
}
