"use strict";
import * as fn from "./functions.js";
import * as kb from "./kbval.js";
import * as dow from "./dowFunctions.js";
import * as pax from "./paxFunctions.js";

// This object will contain all values as properties
var ls = {};
// Continuosly check tablinks status
setInterval(greenBorder, 500);

// ! "START FROM DOW" TOGGLE ********************************************************************OK

const checkBoxDow = document.querySelector("#startFromDow");
checkBoxDow.addEventListener("click", function () {
  if (checkBoxDow.checked === true) {
    dow.clearDowValues();
    dow.startFromDow();
    console.log("Starting straight from DOW..");
    ls.dowStatusOk = false;
    console.log("Dow status ok: ", ls.dowStatusOk);
  } else {
    dow.startFromBasic();
    console.log("DOW build up..");
    ls.dowStatusOk = false;
    console.log("Dow status ok: ", ls.dowStatusOk);
  }
});

//! RESET BUTTONS HANDLING **********************************************************************OK
//! ***********************************************************************************************

document.querySelector("#dowReset").addEventListener("click", () => clearForm("dow"));
document.querySelector("#paxReset").addEventListener("click", () => clearForm("pax"));
document.querySelector("#fuelReset").addEventListener("click", () => clearForm("fuel"));
document.querySelector("#maxReset").addEventListener("click", () => clearForm("max"));
document.querySelector("#deadloadReset").addEventListener("click", () => clearForm("deadload"));

function clearForm(formId) {
  document.querySelector(`#${formId}`).reset();

  if (formId === "dow") {
    dow.startFromBasic();
    console.log("Dow form cleared..");
    ls.dowStatusOk = false;
    console.log("Dow status ok: ", ls.dowStatusOk);
  }

  if (formId === "pax") {
    pax.yesPax();
    console.log("Pax form cleared..");
    ls.paxStatusOk = false;
    console.log("Pax status ok: ", ls.paxStatusOk);
  }

  if (formId === "fuel") {
    console.log("Fuel form cleared..");
    ls.fuelStatusOk = false;
    console.log("Fuel status ok: ", ls.fuelStatusOk);
  }

  if (formId === "max") {
    console.log("Max form cleared..");
    ls.maxStatusOk = false;
    console.log("Max status ok: ", ls.maxStatusOk);
  }

  if (formId === "deadload") {
    console.log("Deadload form cleared: ");
    ls.deadloadStatusOk = false;
    console.log("Deadload status ok: ", ls.deadloadStatusOk);
  }

  const allErrors = document.querySelectorAll("form#" + `${formId}` + " input[type='text'].inputError");
  fn.hideError(formId);

  // Remove error style from field and hides error message
  if (allErrors !== null) {
    for (let i of allErrors) {
      i.classList.remove("inputError");
    }
  }
}

//* LIVE VALIDATION, INPUT FIELDS AND ERROR MESSAGE BEHAVIOUR ***********************************OK
//*************************************************************************************************

document.querySelectorAll("input[type='text']").forEach((item) => {
  item.addEventListener("input", function (e) {
    if (fn.inputIsValid(e.target.value) === false && e.target.value !== "") {
      // fn.showError("dow");
      e.target.classList.add("inputError");
      console.log("Input error!");
    } else {
      fn.hideError("dow");
      e.target.classList.remove("inputError");
      console.log("Input ok..");
    }
  });
});

document.querySelectorAll("input[type='text']").forEach((item) => {
  item.addEventListener("blur", function (e) {
    if (e.target.value === "") {
      // fn.hideError("dow");
      e.target.classList.remove("inputError");
      console.log("Input ok on blur..");
    }
  });
});

//! FINAL DOW VALIDATION ************************************************************************OK
//! ***********************************************************************************************

dowSubmit.addEventListener("click", function (e) {
  var checkBoxDow = document.querySelector("#startFromDow");

  ls.dowStatusOk = false;
  if (checkBoxDow.checked == false) {
    const entriesReq = document.querySelectorAll("form#dow input[type='text'].req");
    const entriesNotReq = document.querySelectorAll("form#dow input[type='text']:not(.req)");
    const allEntries = document.querySelectorAll("form#dow input[type='text']");

    var errorsReq = 0;
    var errorsNotReq = 0;

    // For required fields (basic empty, a/c reg and cockpit), input must be a valid number (0 is not allowed)
    for (let i of entriesReq) {
      if (fn.inputIsValid(i.value) === false || i.value === 0) {
        errorsReq++;
        console.log("required field error");
      }
    }
    // For non required fields (cabin, pantry code and correction), input must be either a valid number or an empty string
    for (let i of entriesNotReq) {
      if (fn.inputIsValid(i.value) === false && i.value != "") {
        errorsNotReq++;
        console.log("not required field error");
      }
    }
    // If no errors have occurred, values can be stored in ls object
    if (errorsReq === 0 && errorsNotReq === 0) {
      console.log("No errors found..");
      ls.bew = fn.prep(document.querySelector("#bew").value);
      ls.bei = fn.prep(document.querySelector("#bei").value);
      ls.acregw = fn.prep(document.querySelector("#acregw").value);
      ls.acregi = fn.prep(document.querySelector("#acregi").value);
      ls.cockpitw = fn.prep(document.querySelector("#cockpitw").value);
      ls.cockpiti = fn.prep(document.querySelector("#cockpiti").value);
      ls.cabinw = fn.prep(document.querySelector("#cabinw").value);
      ls.cabini = fn.prep(document.querySelector("#cabini").value);
      ls.pantryw = fn.prep(document.querySelector("#pantryw").value);
      ls.pantryi = fn.prep(document.querySelector("#pantryi").value);
      ls.correctionw = fn.prep(document.querySelector("#correctionw").value);
      ls.correctioni = fn.prep(document.querySelector("#correctioni").value);

      ls.dow = ls.bew + ls.acregw + ls.cockpitw + ls.cabinw + ls.pantryw + ls.correctionw;
      ls.doi = fn.prep(parseFloat(ls.bei + ls.acregi + ls.cockpiti + ls.cabini + ls.pantryi + ls.correctioni).toFixed(2));
      ls.dowStatusOk = true;

      console.log("dow validation success");
      console.log("DOW: ", ls.dow);
      console.log("DOI: ", ls.doi);
      console.log("Dow status ok: ", ls.dowStatusOk);
    } else {
      fn.showError("dow");
      console.log("dow validation failure");
      ls.dowStatusOk = false;
      console.log("Dow status ok: ", ls.dowStatusOk);
    }
  } else {
    if (fn.inputIsValid(document.querySelector("#bew").value) === true && fn.inputIsValid(document.querySelector("#bei").value) === true) {
      ls.dow = fn.prep(document.querySelector("#bew").value);
      ls.doi = fn.prep(document.querySelector("#bei").value);
      ls.dowStatusOk = true;
      console.log("starting from dow. validation successful");
      console.log("DOW: ", ls.dow);
      console.log("DOI: ", ls.doi);
      console.log("Dow status ok: ", ls.dowStatusOk);
    } else {
      fn.showError("dow");
      console.log("dow validation failure");
      ls.dowStatusOk = false;
      console.log("Dow status ok: ", ls.dowStatusOk);
    }
  }
});

// ! "NIL PAX" TOGGLE CHECKBOX ******************************************************************OK

var checkBoxPax = document.querySelector("#nilPax");
checkBoxPax.addEventListener("click", function () {
  if (checkBoxPax.checked === true) {
    pax.nilPax();
    ls.paxStatusOk === false;
    clearForm("deadload");
    console.log("nil pax selected");
    fn.hideError("pax");
  } else {
    ls.paxStatusOk === false;
    clearForm("deadload");
    pax.yesPax();
    console.log("there are some pax");
  }
});

/*
 ! PAX VALIDATION *******************************************************************************OK
*/

document.querySelector("#paxSubmit").addEventListener("click", function () {
  var checkBoxPax = document.querySelector("#nilPax");

  //* NIL PAX SELECTED
  if (checkBoxPax.checked == true) {
    ls.paxAdult = 0;
    ls.paxChild = 0;
    ls.paxInf = 0;
    ls.paxJ = 0;
    ls.paxC = 0;
    ls.paxY = 0;
    ls.bagsPcs = 0;
    ls.bagsWeight = 0;
    console.log("nil pax, OK");
    ls.paxStatusOk = true;
    console.log("Pax status ok: ", ls.paxStatusOk);
  }
  //* THERE ARE PAX
  else {
    ls.paxStatusOk = false;
    ls.paxAdult = fn.prep(document.querySelector("#paxAdult").value);
    ls.paxChild = fn.prep(document.querySelector("#paxChild").value);
    ls.paxInf = fn.prep(document.querySelector("#paxInf").value);
    ls.paxJ = fn.prep(document.querySelector("#paxJ").value);
    ls.paxC = fn.prep(document.querySelector("#paxC").value);
    ls.paxY = fn.prep(document.querySelector("#paxY").value);

    ls.ttlType = ls.paxAdult + ls.paxChild + ls.paxInf;
    ls.ttlClass = ls.paxJ + ls.paxC + ls.paxY;
    ls.paxWeight = ls.paxAdult * 84 + ls.paxChild * 35;
    //  BAGS FIGURES
    ls.bagsPcs = fn.prep(document.querySelector("#bagsPcs").value);
    ls.bagsWeight = fn.prep(document.querySelector("#bagsWeight").value);
    ls.bagsAvg = fn.prep(parseFloat(ls.bagsWeight / ls.bagsPcs).toFixed(2));

    console.log("Variables assigned....checking...");

    if (
      ls.paxAdult + ls.paxChild + ls.paxInf !== 0 &&
      ls.paxJ + ls.paxC + ls.paxY !== 0 &&
      ls.ttlClass === ls.paxAdult + ls.paxChild &&
      ((ls.bagsPcs === 0 && ls.bagsWeight === 0) || (ls.bagsPcs > 0 && ls.bagsPcs < ls.bagsWeight))
    ) {
      ls.paxStatusOk = true;
      console.log("Pax status ok: ", ls.paxStatusOk);
      console.log("pax figures ok");
      console.log(`TTL Pax: ${ls.paxAdult + ls.paxChild} + ${ls.paxInf} inf`);
      console.log(`Total bags: ${ls.bagsPcs} @ ${ls.bagsWeight} kg, Bag Average: ${ls.bagsAvg} kg`);
      fn.hideError("pax");
    } else {
      ls.paxStatusOk = false;
      fn.showError("pax");
      console.log("pax mismatch");
      console.log("Pax status ok: ", ls.paxStatusOk);
    }
  }
});

/*
 ! FUEL VALIDATION ******************************************************************************OK
*/

document.querySelector("#fuelSubmit").addEventListener("click", function () {
  ls.block = fn.prep(document.querySelector("#block").value);
  ls.trip = fn.prep(document.querySelector("#trip").value);
  ls.taxi = fn.prep(document.querySelector("#taxi").value);

  if (ls.block !== 0 && ls.trip !== 0 && ls.taxi !== 0 && ls.taxi < ls.trip && ls.trip < ls.block) {
    ls.fuelStatusOk = true;
    fn.hideError("fuel");
    console.log("Fuel status ok: ", ls.fuelStatusOk);
    console.log(`BLOCK: ${ls.block}, TRIP: ${ls.trip}, TAXI: ${ls.taxi}`);
  } else {
    ls.fuelStatusOk = false;
    fn.showError("fuel");
    console.log("Fuel status ok: ", ls.fuelStatusOk);
  }
});

/*
 ! MAX VALIDATION *******************************************************************************OK
*/

document.querySelector("#maxSubmit").addEventListener("click", function () {
  ls.mzfw = fn.prep(document.querySelector("#mzfw").value);
  ls.mtow = fn.prep(document.querySelector("#mtow").value);
  ls.mlaw = fn.prep(document.querySelector("#mlaw").value);

  if (ls.mzfw !== 0 && ls.mtow !== 0 && ls.mlaw !== 0 && ls.mtow > ls.mlaw && ls.mlaw > ls.mzfw) {
    ls.maxStatusOk = true;
    fn.hideError("max");
    console.log("Max status ok: ", ls.maxStatusOk);
    console.log(`MZFW: ${ls.mzfw}, MTOW: ${ls.mtow}, MLAW: ${ls.mlaw}`);
  } else {
    ls.maxStatusOk = false;
    fn.showError("max");
    console.log("Max status ok: ", ls.maxStatusOk);
  }
});

/*
 ! DEADLOAD VALIDATION **************************************************************************OK
*/

document.querySelector("#deadloadSubmit").addEventListener("click", function () {
  // Bags row
  ls.bags1 = fn.prep(document.querySelector("#bags1").value);
  ls.bags2 = fn.prep(document.querySelector("#bags2").value);
  ls.bags3 = fn.prep(document.querySelector("#bags3").value);
  ls.bags4 = fn.prep(document.querySelector("#bags4").value);
  ls.bags5 = fn.prep(document.querySelector("#bags5").value);
  ls.bagsTotal = fn.prep(document.querySelector("#bagsTotal").value);

  // Mail row
  ls.mail1 = fn.prep(document.querySelector("#mail1").value);
  ls.mail2 = fn.prep(document.querySelector("#mail2").value);
  ls.mail3 = fn.prep(document.querySelector("#mail3").value);
  ls.mail4 = fn.prep(document.querySelector("#mail4").value);
  ls.mail5 = fn.prep(document.querySelector("#mail5").value);
  ls.mailTotal = fn.prep(document.querySelector("#mailTotal").value);

  // Cargo row
  ls.cargo1 = fn.prep(document.querySelector("#cargo1").value);
  ls.cargo2 = fn.prep(document.querySelector("#cargo2").value);
  ls.cargo3 = fn.prep(document.querySelector("#cargo3").value);
  ls.cargo4 = fn.prep(document.querySelector("#cargo4").value);
  ls.cargo5 = fn.prep(document.querySelector("#cargo5").value);
  ls.cargoTotal = fn.prep(document.querySelector("#cargoTotal").value);

  // Tare row
  ls.tare1 = fn.prep(document.querySelector("#tare1").value);
  ls.tare2 = fn.prep(document.querySelector("#tare2").value);
  ls.tare3 = fn.prep(document.querySelector("#tare3").value);
  ls.tare4 = fn.prep(document.querySelector("#tare4").value);
  ls.tare5 = fn.prep(document.querySelector("#tare5").value);
  ls.tareTotal = fn.prep(document.querySelector("#tareTotal").value);

  // TOTAL row
  ls.total1 = fn.prep(document.querySelector("#total1").value);
  ls.total2 = fn.prep(document.querySelector("#total2").value);
  ls.total3 = fn.prep(document.querySelector("#total3").value);
  ls.total4 = fn.prep(document.querySelector("#total4").value);
  ls.total5 = fn.prep(document.querySelector("#total5").value);
  ls.total = fn.prep(document.querySelector("#total").value);

  if (
    (ls.bagsTotal === ls.bags1 + ls.bags2 + ls.bags3 + ls.bags4 + ls.bags5) &&
    (ls.mailTotal === ls.mail1 + ls.mail2 + ls.mail3 + ls.mail4 + ls.mail5) &&
    (ls.cargoTotal === ls.cargo1 + ls.cargo2 + ls.cargo3 + ls.cargo4 + ls.cargo5) &&
    (ls.tareTotal === ls.tare1 + ls.tare2 + ls.tare3 + ls.tare4 + ls.tare5) &&
    (ls.total === ls.bagsTotal + ls.mailTotal + ls.cargoTotal + ls.tareTotal) &&
    (ls.total1 === ls.bags1 + ls.mail1 + ls.cargo1 + ls.tare1) &&
    (ls.total2 === ls.bags2 + ls.mail2 + ls.cargo2 + ls.tare2) &&
    (ls.total3 === ls.bags3 + ls.mail3 + ls.cargo3 + ls.tare3) &&
    (ls.total4 === ls.bags4 + ls.mail4 + ls.cargo4 + ls.tare4) &&
    (ls.total5 === ls.bags5 + ls.mail5 + ls.cargo5 + ls.tare5)
  ) {
    ls.deadloadStatusOk = true;
    console.log("Deadload status ok: ", ls.deadloadStatusOk);
    fn.hideError("deadload");

    console.log(`Total bags weight: ${ls.bagsTotal}`);
    console.log(`Total mail weight: ${ls.mailTotal}`);
    console.log(`Total cargo weight: ${ls.cargoTotal}`);
    console.log(`Total tare weight: ${ls.tareTotal}`);
    console.log(`Total weight: ${ls.total}`);


  } else {
    ls.deadloadStatusOk = false;
    console.log("Deadload status ok: ", ls.deadloadStatusOk);
    fn.showError("deadload");
  }
});


// * GREEN BORDER WHEN STATUS IS OK ***************************************************************OK

function greenBorder() {
  // Dow check
  if (ls.dowStatusOk === true) { 
    document.querySelector("#defaultOpen").classList.add("tablinkOk");
  } 
  else { 
    document.querySelector("#defaultOpen").classList.remove("tablinkOk");
  }

  // Pax check
  if (ls.paxStatusOk === true) {
    document.querySelector("#paxMenu").classList.add("tablinkOk");} 
  else {
    document.querySelector("#paxMenu").classList.remove("tablinkOk");
  }

  // Fuel check
  if (ls.fuelStatusOk === true) {
    document.querySelector("#fuelMenu").classList.add("tablinkOk");
  } else {
    document.querySelector("#fuelMenu").classList.remove("tablinkOk");
  }

  // Max check
  if (ls.maxStatusOk === true) {
    document.querySelector("#maxMenu").classList.add("tablinkOk");
  } else {
    document.querySelector("#maxMenu").classList.remove("tablinkOk");
  }

  if (ls.deadloadStatusOk === true) {
    document.querySelector("#deadloadMenu").classList.add("tablinkOk");
  } else {
    document.querySelector("#deadloadMenu").classList.remove("tablinkOk");
  }
}


window.addEventListener("load", toggle);

function toggle(){
  let myBlink = document.querySelector("span#blink");
  (myBlink.style.visibility === "visible" ? myBlink.style.visibility = "hidden" : myBlink.style.visibility = "visible");
}

setInterval(toggle, 600);