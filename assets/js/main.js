const formEl = document.getElementById("courier-request");

const localStorageKey = "courierData";

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
  console.log(formValueObj);

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
  // alert("Courier Request submitted successfully");
  getAllCoureirDatas();
  formEl.reset();
});
//show the submitted value on the bottom of the table
function getAllCoureirDatas() {
  const courierData = localStorage.getItem(localStorageKey);
  const courierDataArr = JSON.parse(courierData);
  // console.log(courierDataArr);
  if (courierDataArr) {
    const courierCardEl = document.querySelector("#courierCard");
    courierCardEl.classList.remove("hidden");

    const tableEl = document.getElementById("courierDataTableBody");

    tableEl.innerHTML = "";

    const newFinalValue = [];

    const finalData = courierDataArr.map((courierData, index) => {
      const trEl = document.createElement("tr");
      const tdEl1 = document.createElement("td");
      const tdEl2 = document.createElement("td");
      const tdEl3 = document.createElement("td");
      const tdEl4 = document.createElement("td");
      const tdEl5 = document.createElement("td");
      const tdEl6 = document.createElement("td");
      const deleteBtnEl = document.createElement("button");

      trEl.classList.add("text-sm");

      tdEl1.classList.add("px-2", "py-1", "border");
      tdEl1.textContent = index + 1;

      tdEl2.classList.add("px-2", "py-1", "border");
      tdEl2.textContent = courierData.name;

      tdEl3.classList.add("px-2", "py-1", "border");
      tdEl3.textContent = courierData.mobile;

      tdEl4.classList.add("px-2", "py-1", "border");
      tdEl4.textContent = formatMyDate(courierData["pickup-date"]);

      tdEl5.classList.add("px-2", "py-1", "border");
      tdEl5.textContent = courierData["pickup-area"];

      deleteBtnEl.className =
        "px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded";
      deleteBtnEl.textContent = "Delete";

      tdEl6.classList.add("px-2", "py-1", "border");
      tdEl6.append(deleteBtnEl);

      trEl.append(tdEl1, tdEl2, tdEl3, tdEl4, tdEl5, tdEl6);
      newFinalValue.push(trEl);
    });

    //appending the value inside of the table row
    newFinalValue.forEach((el) => tableEl.append(el));
  } else {
    console.log("No value available on localstorage");
  }
}
getAllCoureirDatas();
