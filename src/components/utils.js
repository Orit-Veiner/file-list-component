export function capitalizeFirstLetter(input) {
    if (typeof input !== "string" || input.length === 0) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  