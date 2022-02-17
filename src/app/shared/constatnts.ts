export const searchPattern = /(^([a-zA-Z][a-zA-Z -]*[a-zA-Z])$)|^[a-zA-Z]$/;

export const usernamePattern = /^[a-zA-Z]+(\s|-|[A-Z])[a-zA-Z]+$/;
export const emailPattern = /^\w*\.?\w*\.?\w*\.?\w*@\w{1,5}\.(com|net|org|co|us)$/;
export const passwordPattern = /(?=.*\d)(?=.*\p{Lu})(?=.*\W)/u;
