export const checkEmail = (value: string) => {
  const email = value.split("@");

  if (email.length === 2 && email[0].length > 1) {
    const domain = email[1].split(".");

    if (domain.length === 2 && domain[0].length > 1 && domain[0].length <= 10 && domain[1].length > 1 && domain[1].length < 5) {
      return true;
    }
  }

  return false;
};
