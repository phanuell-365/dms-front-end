export const usePluralize = (name: string, value: number) => {
  const pluralize = (name: string, value: number) => {
    if (value > 1) {
      return `${name}s`;
    }
    return name;
  };
  return pluralize(name, value);
};
