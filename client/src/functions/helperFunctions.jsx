export default function removeTypename(obj) {
  if (typeof obj === 'object' && obj !== null) {
    // Check if the key is 'workout'
    if (Array.isArray(obj) && obj.every(item => typeof item === 'object')) {
      // If 'workout' is an array of objects, recursively remove __typename from each object
      return obj.map(item => removeTypename(item));
    } else {
      // Create a new object without the __typename property
      const newObj = {};
      for (const key in obj) {
        if (key !== '__typename') {
          newObj[key] = removeTypename(obj[key]);
        }
      }
      return newObj;
    }
  } else {
    return obj;
  }
}