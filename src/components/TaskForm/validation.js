export const validateForm = (formData) => {
  let isValid = true;
  const errors = {};
  if (formData.taskName === "") {
    isValid = false;
    errors.taskName = "Task Input cannot be empty";
  }

  return { isValid, errors };
};
