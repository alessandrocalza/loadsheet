// ! UTILITY FUNCTION

// * REAL NUMBER REGEX
export function inputIsValid(s) {
        let pattern = /^[-+]?[0-9]*[\.|,]?[0-9]+$/g;
        if (pattern.test(s)) {
          return true;
        } else return false;
}



// * REPLACES , WITH .
export function prep(s) {
        if (/,/.test(s)) {
          return Number(s.replace(",", "."));
        } else return Number(s);
}



// * SHOWS ERROR MESSAGE IN A SPECIFIC PAGE
export function showError(formId) {
  var paraId = formId + "Error";
  var para = document.querySelector(`p#${paraId}`);
  para.innerHTML = "Please check your input";
  para.style.visibility = "visible";
}



// * HIDES ERROR MESSAGE IN A SPECIFIC PAGE
export function hideError(formId) {
  var paraId = formId + "Error";
  var para = document.querySelector(`p#${paraId}`);
  para.innerHTML = "";
  para.style.visibility = "hidden";
}
