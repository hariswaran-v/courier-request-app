const formEl = document.getElementById("courier-request");

const localStorageKey = "courierData";

const validateForm = new JustValidate(formEl, {
  errorLabelCssClass: "form-error",
  validateBeforeSubmitting: true,
});
``;
validateForm.addField("#name", [
  { rule: "required" },
  { rule: "minLength", value: 3 },
  { rule: "maxLength", value: 30 },
]);
validateForm.addField("#mobile", [
  { rule: "required" },
  { rule: "customRegexp", value: /^[0-9]{10}$/ },
]);
validateForm.addField("#pickup-date", [
  { rule: "required", errorMessage: "Date and time is required" },
]);
validateForm.addField("#pickup-area", [
  { rule: "required", errorMessage: "Date and time is required" },
]);

validateForm.onSuccess(() => {
  const formData = new FormData(formEl);

  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  const formValueObj = Object.fromEntries(formData.entries());

  const newCourierData = [];

  //Get existing LocalStorage value, it it's exist!
  const existingCourierData = localStorage.getItem(localStorageKey);
  // console.log(existingCourierData);

  //Parse that string into Javascript value
  const existingCourierArray = JSON.parse(existingCourierData);
  // console.log("submitted", existingCourierArray);
  if (existingCourierArray) {
    //Create a new array and push the existing LocalStorage value into new array
    existingCourierArray.push(formValueObj);
    //Push the new array (which has all the info fo the LocalStorage)
    localStorage.setItem(localStorageKey, JSON.stringify(existingCourierArray));
  } else {
    newCourierData.push(formValueObj);
    localStorage.setItem(localStorageKey, JSON.stringify(newCourierData));
  }
  alert("Courier Request submitted successfully");
  formEl.reset();
});

//show the submitted value on the bottom of the table
function getAllCoureirDatas() {
  const courierData = localStorage.getItem(localStorageKey);
  const courierDataArr = JSON.parse(courierData);
  // console.log(courierDataArr);
  if (courierDataArr) {
    const tableEl = document.getElementById("courierDataTable");

    const finalData = courierDataArr.map((courierData) => {
      return `
    <tr>
      <td class="px-2 py-1 border text-sm">${courierData.name}</td>
      <td class="px-2 py-1 border">${courierData.mobile}</td>
      <td class="px-2 py-1 border text-sm">${courierData["pickup-date"]}</td>
      <td class="px-2 py-1 border text-sm">${courierData["pickup-area"]}</td>
      <td class="px-2 py-1 border">
        <button class="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Google Material Icons -->
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
            />
          </svg>
        </button>
      </td>
    </tr>
  `;
    });
    //appending the value inside of the table row
    console.log(finalData);

    tableEl.innerHTML += finalData.join("");
  } else {
    console.log("No value available on localstorage");
  }
}
getAllCoureirDatas();
