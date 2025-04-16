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

validateForm.onSuccess(() => {
  const formData = new FormData(formEl);

  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  const formValueObj = Object.fromEntries(formData.entries());

  //Get existing LocalStorage value, it it's exist!
  const existingCourierData = localStorage.getItem("courierData");
  // console.log(existingCourierData);

  //Parse that string into Javascript value
  const existingCourierArray = JSON.parse(existingCourierData);
  console.log(existingCourierArray);

  //Create a new array and push the existing LocalStorage value into new array
  //Push the new array (which has all the info fo the LocalStorage)
});
