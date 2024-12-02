import { computed } from "vue";

const EMAIL_REGEXP = /^[A-z]+[\w\-\\.]+@[\w\-\\.]+\.[A-z]{2,5}$/;

export const isEmailValid = (value) => EMAIL_REGEXP.test(value);

export const useValidation = (model, schema) => {
  const validations = computed(() => {
    const invalidValues = {};
    Object.entries(schema).forEach(
      ([key, validation]) => (invalidValues[key] = !!validation(model[key]))
    );
    return invalidValues;
  });

  const hasValidationError = computed(() => {
    console.log(validations.value);
    console.log(Object.values(validations.value).find((value) => !value));
    return (
      Object.values(validations.value).findIndex((value) => value === false) ===
      -1
    );
  });

  return { validations, hasValidationError };
};
