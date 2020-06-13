// ! TABS HANDLING ************************************************************

// Get the element with id="defaultOpen" and click on it
document.querySelector("#defaultOpen").click();

function openPage(pageName, element, color) {
  var tabcontent, tablinks;

  // Hide all elements with class="tabcontent" by default
  tabcontent = document.querySelectorAll(".tabcontent");
  for (let i of Array.from(tabcontent)) {
    i.style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.querySelectorAll(".tablink");
  for (let i of Array.from(tablinks)) {
    i.style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  element.style.backgroundColor = color;
}
