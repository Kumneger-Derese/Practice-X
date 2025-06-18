const useValidation = (schema) => {
  const validate = (formData) => {
    const { error, value } = schema.validate(formData, { abortEarly: false });

    if (!error) return { isValid: true, errors: {}, value };

    const errors = {};

    error.details.forEach((detail) => {
      const field = detail.path[0];
      errors[field] = detail.message;
    });

    return { isValid: false, errors, value: {} };
  };

  return { validate };
};

export default useValidation;
