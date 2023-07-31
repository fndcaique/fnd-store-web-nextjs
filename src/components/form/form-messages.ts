const FormMessages = {
  required: 'Este campo é obrigatório',
  minLength: (min: number) => `Este campo deve ter no mínimo ${min} caracteres`,
  maxLength: (max: number) => `Este campo deve ter no máximo ${max} caracteres`,
  email: 'Este campo deve ter um email válido'
};
export default FormMessages;
