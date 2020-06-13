//! DOW RELATED FUNCTIONS

// * TOGGLE DOW CHECKBOX: HIDES * AND ?
// * CHANGES "BASIC EMPTY" TO "DRY OPERATING"
// * DISABLES UNNECESSARY INPUTS
// * MAKES LEFT HAND SIDE LIST ENTRIES GREY

export function startFromDow() {
  var optDow = document.querySelectorAll(".optDow");
  // TOGGLE DOW CHECKBOX: HIDES * AND ?
  for (let i of optDow) {
    i.style.visibility = "hidden";
  }

  // CHANGES "BASIC EMPTY" TO "DRY OPERATING"
  document.querySelector("#be").innerHTML = "dry operating *";

  // DISABLES UNNECESSARY INPUTS
  var togInputs = document.querySelectorAll("input[type='text'].togDow");

  // var togInputs = document.querySelectorAll("form#dow input[type='text']:not(bew, bei)");

  for (let i of togInputs) {
    i.disabled = true;
  }

  // MAKES LEFT HAND SIDE LIST ENTRIES GREY
  var fadeList = document.querySelectorAll(".fadeDow");
  for (let i of fadeList) {
    i.style.color = "#666";
    i.style.fontStyle = "oblique";
  }
}



// * REVERSES FUNCTION ABOVE
export function startFromBasic() {
  var optDow = document.querySelectorAll(".optDow");

  // MAKES VISIBLE ALL * AND ?
  for (let i of optDow) {
    i.style.visibility = "visible";
  }

  // SETS FIRST INPUT BACK TO BASIC EMPTY
  document.querySelector("#be").innerHTML = "basic empty *";

  // ENABLES ALL INPUT ELEMENTS
  var togInputs = document.querySelectorAll("input[type='text'].togDow");
  for (let i of togInputs) {
    i.classList.remove("inputError");
    i.disabled = false;
    // i.style.backgroundColor = "white";
  }

  // SETS LEFT HAND SIDE LIST BACK TO WHITE
  var fadeList = document.querySelectorAll(".fadeDow");
  for (let i of fadeList) {
    i.style.color = "white";
    i.style.fontStyle = "";
  }
}



// * SET ALL VALUES TO AN EMPTY STRING, AKA SOFT RESET
export function clearDowValues() {
  var allInputs = document.querySelectorAll("form#dow input[type='text']");
  for (let i of allInputs) {
    i.value = "";
  }
}