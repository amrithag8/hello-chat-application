export const validate = (email, password, fullname) => {
  const isFullnameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(fullname);

  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const ispasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isFullnameValid) return "Fullname is not valid";
  if (!isEmailValid) return "Email ID is not valid";
  if (!ispasswordValid)
    return "Password must contain 8 alpha numeric characters, one upper case letter, and one symbol";

  return null;
};

export const loginValidation=(email, password)=>{
  const isemailValid=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const ispasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isemailValid) return "Email ID is not valid";
    if(!ispasswordValid) return "Password invalid, It must contain 8 alpha numeric characters, one upper case letter, and one symbol ";
    return null;
}
