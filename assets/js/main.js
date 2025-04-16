const formEl = document.getElementById("courier-request");

const validateForm = new JustValidate(formEl, {
  errorLabelCssClass: "form-error",
  validateBeforeSubmitting: true,
});

validateForm.addField("#name", [
  { rule: "required" },
  { rule: "minLength", value: 3 },
  { rule: "maxLength", value: 30 },
]);
validateForm.addField("#mobile", [
  { rule: "required" },
  { rule: "customRegexp", value: /^[0-9]{10}$/ },
]);
validateForm.addField("#date-time", [
  { rule: "required", errorMessage: "Date and time is required" },
]);
validateForm.addField("#text-area", [
  { rule: "required", errorMessage: "Date and time is required" },
]);

validateForm.onSuccess((e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
});
