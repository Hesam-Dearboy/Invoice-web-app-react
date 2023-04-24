export function validateSenderStreetAddress(streetAddress) {
  if (!streetAddress.trim()) {
    return false;
  }
  return true;
}
export function validateSenderCity(city) {
  if (!city.trim()) {
    return false;
  }
  return true;
}
export function validateSenderPostCode(postCode) {
  return /^\d{5}(-\d{4})?$/.test(postCode); // Basic post code validation
}
export function validateSenderCountry(country) {
  if (!country.trim()) {
    return false;
  }
  return true;
}

export function validateCLientName(name) {
  return /^[a-zA-Z]+$/.test(name); // Only allow letters
}
export function validateCLientEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
}

export function validateClientStreetAddress(streetAddress) {
  if (!streetAddress.trim()) {
    return false;
  }
  return true;
}
export function validateClientCity(city) {
  if (!city.trim()) {
    return false;
  }
  return true;
}
export function validateClientPostCode(postCode) {
  return /^\d{5}(-\d{4})?$/.test(postCode); // Basic post code validation
}
export function validateClientCountry(country) {
  if (!country.trim()) {
    return false;
  }
  return true;
}

export function validateItemName(itemName) {
  if (!itemName.trim()) {
    return false;
  }
  return true;
}
export function validateItemPrice(itemPrice) {
  if (itemPrice <= 0) {
    return false;
  }
  return true;
}
export function validateItemCount(itemCount) {
  if (itemCount <= 0) {
    return false;
  }
  return true;
}
