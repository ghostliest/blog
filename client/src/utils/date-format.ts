type format = "DD.MM.YYYY:HH.MM" | "DD.MM.YYYY";

export const dateFormat = (value: string | Date, type: format = "DD.MM.YYYY:HH.MM") => {
  const date = new Date(value);

  if (type === "DD.MM.YYYY:HH.MM") {
    return date.toLocaleString().slice(0, 17);
  } else if (type === "DD.MM.YYYY") {
    return date.toLocaleDateString();
  }
};
