// Ensure DOM is ready
$(document).ready(function () {
  
  // Toggle navbar when menu button is clicked
  $("#menu-toggle").click(function () {
    $("#nav-links").toggleClass("active");
  });

  // Auto close menu after clicking a link (mobile friendly)
  $("#nav-links a").click(function () {
    $("#nav-links").removeClass("active");
  });

});