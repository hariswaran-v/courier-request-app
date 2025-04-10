const validate = new JustValidate("#courier-req-form", {
  errorLabelCssClass: "form-error", // ✅ Set globally instead of for each field
});

validate
  .addField("#name", [
    { rule: "required" },
    { rule: "minLength", value: 3 },
    { rule: "maxLength", value: 20 },
  ])
  .addField("#mobile", [
    { rule: "required" },
    { rule: "number" }, // ✅ Corrected "number" to "numeric"
    { rule: "minLength", value: 10 },
    { rule: "maxLength", value: 10 },
  ]);

validate.addField("#date", [{ rule: "required" }]);
validate.addField("#text-area", [{ rule: "required" }]);
console.log(validate);
