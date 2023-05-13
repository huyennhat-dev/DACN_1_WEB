export const isPhone = (val) => {
  return /^0\d{9}$/.test(val);
};
export const isEmail = (val) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
};
export const isPassWord = (val) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%&*]{8,}$/.test(val);
};

export const isUsername = (val) => {
  return /^[a-zA-Z0-9._-]{6,}$/.test(val);
};
export const isName = (val) => {
  return /^[a-zA-Z]{3,}(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(val);
};
