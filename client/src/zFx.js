


// Handle All Server Requests and Errors
// Returns Data from Server and Applys all then Fx's
/**
* 
*   @param {Promise} axiosRequest - Axios Request Promise
*   @param {function} thenFx - then Callback Functions to Chain
*
*/
export function request(axiosRequest, ...thenFx) {

  const req = axiosRequest.then(res => {
    
    // Throw Server Error

    // Return Server Data
    return res.response.data
    
  })

  // Apply then Fx's
  thenFx.reduce((a, n) => a.then(n), req)

  // Error Handling
  .catch(error => {

      // Message Error Responses

  })

  // Catch All
  .catch(error => alert(error))

}


/** Checks for Invalid/Missing Data
* @param {any} value - Value to Check
* @returns {boolean} Is Data Valid true/false
*/
export function isInvalid (value) {
  return value === undefined || value === "" || value === null;
};


/** Checks Object for Invalid/Missing Properties
* @param {string []} aryRequired - Array of Required Properties
* @param {object} objValues - Object to Check
* @param {object []} aryRename - Rename Array for User { key: Rename }
* @returns {string[]} [0] Array of Missing Data and [1] String of Missing Data
*/
export function isMissing(aryRequired, objValues, aryRename) {

  // Filter Out Valid Data
  let missing = aryRequired.filter(n => isInvalid(objValues[n]));

  // Format Missing Data Return String
  if (missing.length) {

    // Rename & Return
    missing = missing.map(n => aryRename[n] || n)
    return [missing, "Missing Data for: " + missing.join(", ")];

  }

  // Return Empty String for All Data Present
  return "";
};