$(document).ready(function(){

      function showSignup() {
        $("#login-form").removeClass("active");
        $("#signup-form").addClass("active");
      }

      function showLogin() {
        $("#signup-form").removeClass("active");
        $("#login-form").addClass("active");
      }

      function login() {
        const email = $(".userBtn").val().trim();
        const pass = $(".passBtn").val().trim();
        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[email] === pass) {
          alert("Login successful!");
          window.location.href = "homepage.html";
        } else {
          alert("Invalid email or password");
        }
      }

      function createAccount() {
        const fname = $("#fname").val().trim();
        const lname = $("#lname").val().trim();
        const email = $("#newEmail").val().trim();
        const pass = $("#newPass").val().trim();
        const confirm = $("#confirmPass").val().trim();

        if (!fname || !lname || !email || !pass || !confirm) {
          alert("Please fill in all fields.");
          return;
        }

        if (pass !== confirm) {
          alert("Passwords do not match.");
          return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[email]) {
          alert("An account with this email already exists.");
          return;
        }

        users[email] = pass;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created successfully! Please log in.");
        showLogin();
      }

      // Attach events
      $("#signup-btn").click(showSignup);
      $("#login-btn").click(showLogin);
      $("#login-submit").click(login);
      $("#signup-submit").click(createAccount);
    });