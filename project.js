// Pre-fill booking form if button clicked
function bookCar(model) {
  document.getElementById("carModel").value = model;
  document.getElementById("booking").scrollIntoView({behavior: "smooth"});
}

// Booking form validation
document.getElementById("bookForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value;
  const car = document.getElementById("carModel").value;
  const license = document.getElementById("license").files[0];

  if (!name || !email || !date || !car || !license) {
    alert("Please fill in all fields and upload your license.");
    return;
  }

  // Save booking info in localStorage
  const booking = { name, email, date, car };
  localStorage.setItem("booking", JSON.stringify(booking));

  alert("Booking confirmed for " + car + "!");
  document.getElementById("bookForm").reset();
});

document.getElementById("menu-toggle").addEventListener("click", function() {
  document.getElementById("nav-links").classList.toggle("active");
});
