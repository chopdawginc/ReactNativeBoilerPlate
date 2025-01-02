export const capitalizeFirstLetter = (value?: string): string | undefined => {
  if (value && value.length > 1) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
};

export const addNumbers = (a: number | string, b: number | string): number => {
  // Convert to number if it's string
  const numA = typeof a === 'string' ? parseFloat(a) : a;
  const numB = typeof b === 'string' ? parseFloat(b) : b;

  // If NaN, treat it as 0
  const validNumA = isNaN(numA) ? 0 : numA;
  const validNumB = isNaN(numB) ? 0 : numB;

  // Return the sum of validNumA and validNumB
  return validNumA + validNumB;
};

// Split the object for sorting data
export const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((value, key) => {
    if (value === undefined || value === null) return undefined;
    return value[key];
  }, obj);
};
