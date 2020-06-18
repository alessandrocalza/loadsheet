//! PAX RELATED FUNCTIONS

// * NIL PAX FUNCTION
export function nilPax() {
        var optPax = document.querySelectorAll(".optPax");
        var allInputs = document.querySelectorAll("form#pax input[type='text']");

        // SET TO "" ALL INPUTS
        for (let i of allInputs) {
                i.value = "";
        }

        // MAKES LEFT HAND SIDE LIST ENTRIES GREY
        var fadeList = document.querySelectorAll(".fadePax");
        for (let i of fadeList) {
                i.style.color = "#666";
                i.style.fontStyle = "oblique";
        }

        // HIDES ALL * AND ?
        for (let i of optPax) {
                i.style.visibility = "hidden";
        }

        // DISABLES ALL UNNECESSARY INPUT ELEMENTS
        var togInputs = document.querySelectorAll("input[type='text'].togPax");
        for (let i of togInputs) {
                i.disabled = true;
                // i.style.backgroundColor = "grey";
        }
}



// * YES PAX FUNCTION
export function yesPax() {
        var optPax = document.querySelectorAll(".optPax");
        // ENABLES ALL INPUT ELEMENTS
        var togInputs = document.querySelectorAll("input[type='text'].togPax");
        for (let i of togInputs) {
                i.disabled = false;
                // i.style.backgroundColor = "white";
        }
        // SETS LEFT HAND SIDE LIST BACK TO WHITE
        var fadeList = document.querySelectorAll(".fadePax");
        for (let i of fadeList) {
                i.style.color = "white";
                i.style.fontStyle = "";
        }
        // MAKES VISIBLE ALL * AND ?
        for (let i of optPax) {
                i.style.visibility = "visible";
        }
}

// export function passen() {
//         const pax = {
//                 adult : 10,
//                 child : 5
//         }
//         return pax;
// }