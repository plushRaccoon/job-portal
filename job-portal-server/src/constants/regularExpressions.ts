export const TEXT_REGEX =
  /^(?!\s)[a-zA-Z0-9\s.,'&()_\-@#!$%^*+=?<>:;]{0,}(?!\s)$/;
export const TEXT_REGEX_MESSAGE =
  'must only include letters, numbers, and special characters';

export const PASSWORD_REGEX =
  /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z0-9!-~]{8,20}$/;
export const PASSWORD_REGEX_MESSAGE =
  'must be between 8 and 20 characters long and contain at least one uppercase letter, one lowercase letter, one digit and special characters';

export const EMAIL_REGEX =
  /^[a-zA-Z0-9._+-]{3,50}@[a-zA-Z0-9.-]{3,50}\.[a-zA-Z]{2,}$/;
export const EMAIL_REGEX_MESSAGE =
  'must be an email with characters of Latin origin and digits. UserName may contain: (_), (.), (-) and (+). Domain name may contain digits, (-) and (.).';

export const NAME_REGEX =
  /^(?=.*[a-zA-Z])[a-zA-Z0-9.'-][a-zA-Z0-9.' -]{0,28}[a-zA-Z0-9éèêë.'-]$/;
export const NAME_REGEX_MESSAGE =
  "must be between 2 and 30 characters long and may only include letters, digits and special characters (-), (.), (')";
