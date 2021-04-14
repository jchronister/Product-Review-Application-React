


/**
*   Axios Request Proxy to Apply Callback Functions & Handle Errors
*   @param {Promise} axiosReq - axios Request Returned Promise
*   @param {function} thenFx - n Functions to Apply as then
*/
export function axiosRequest (axiosReq, ...thenFx) {

  // Server Request - Pass Good Data and Throw All Errors
  const request = axiosReq.then(data => {

// debugger
    // Return Object Data
    if (data.data && data.data.status === "Success") return data.data

    // Throw Non Server Response Object Error
    throw (data.data)
  })

  // Apply Callback Functions
  thenFx.reduce((a, n) => a.then(n), request)

  // Handle Errors
  .catch(err => {

// debugger

    if (err.response && err.response.data && err.response.data.error) {

      // Show Server Response Error 
      alert("Server Message\n" + Object.entries(err.response.data).join("\n"))
    
    } else if (err.response  ) {

      // Show Axios Reponse Error
      alert("Axios Error See Console")
      console.log(err.response)

    } else {

      // Other Error
      console.log("Request Error", err)
      alert("Request Error.\n" + JSON.stringify(err, null, 2) + "\nSee Console for Details")

    } 

  })

  // Catch All Misc Errors
  .catch((err)=>alert("Unknown Error - Programming Logic Error: " + err))

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



/** Returns Attribute Stored in element.data.[attribute]
*   Checks Parent Element if Not Found.
* @param {element} element Child Element
* @param {string} attribute Data Attribute to Retrieve
* @returns {string} attribute or null
*/
export function getDataAttribute (element, attribute) {
  let el = element
  while (el && !el.dataset[attribute]) el = el.parentElement
  return el && el.dataset[attribute]
}



// Show Response Message
export function message (data, success) {
  if (data.nModified === 1) {
    alert(success)
  } else {
    alert(JSON.stringify(data, null, 2))
  }
}