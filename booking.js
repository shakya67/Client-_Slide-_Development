// booking.js
$(function () {
  // show year
  $('#year2').text(new Date().getFullYear());

  // load selected car from LocalStorage
  const stored = localStorage.getItem('autohub.selectedCar');
  let car = stored ? JSON.parse(stored) : null;

  if (!car) {
    // fallback
    car = { name: 'No car selected', img: 'images/car-placeholder.jpg', desc: 'Select a car from the shop', price: 0 };
  }

  $('#carTitle').text(car.name);
  $('#carDesc').text(car.desc || '');
  $('#carPrice').text(Number(car.price || 0).toLocaleString());
  $('#specMileage').text(car.mileage || '—');
  $('#specYear').text(car.year || '2025');
  $('#specFuel').text(car.fuel || '—');

  // populate carousel - simple single-image or duplicate for smoother UX
  const $track = $('.carousel-track');
  $track.empty();
  const img = $('<img>').attr('src', car.img || 'images/car-placeholder.jpg').attr('alt', car.name + ' image');
  $track.append(img);

  // Carousel controls (for single image it just keeps same image)
  $('.carousel-btn.prev, .carousel-btn.next').on('click', function () {
    // For demo: flash image to indicate action
    $track.find('img').fadeOut(150).fadeIn(150);
  });

  // set min date to today
  const today = new Date().toISOString().split('T')[0];
  $('#date').attr('min', today);

  // pricing: estimate monthly & total (simple prorated estimator)
  function computeEstimates() {
    const months = Number($('#months').val()) || 1;
    const price = Number(car.price) || 0;
    // monthly = base monthly depreciation / finance estimate (simple)
    const monthly = (price / 60) * (1 + 0.04); // 60-month baseline + 4% fee
    const total = monthly * months;
    $('#monthlyEstimate').text(monthly.toFixed(2));
    $('#totalEstimate').text(total.toFixed(2));
  }
  $('#months').on('input change', computeEstimates);
  computeEstimates();

  // load draft if exists
  const draftKey = 'autohub.bookingDraft';
  const draft = JSON.parse(localStorage.getItem(draftKey) || '{}');
  if (draft && Object.keys(draft).length) {
    $('#fullName').val(draft.fullName || '');
    $('#email').val(draft.email || '');
    $('#phone').val(draft.phone || '');
    $('#date').val(draft.date || '');
    $('#months').val(draft.months || 12);
    $('#notes').val(draft.notes || '');
    computeEstimates();
  }

  // save draft
  $('#saveDraft').on('click', function () {
    const d = {
      fullName: $('#fullName').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      date: $('#date').val(),
      months: $('#months').val(),
      notes: $('#notes').val()
    };
    localStorage.setItem(draftKey, JSON.stringify(d));
    $('#formFeedback').text('Draft saved to your browser.').show().delay(2500).fadeOut();
  });

  // validation helper
  function validateForm() {
    const name = $('#fullName').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const date = $('#date').val();

    if (!name) return 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
    if (!/^\d{10}$/.test(phone)) return 'Phone number must be 10 digits (numbers only).';
    if (!date) return 'Please choose a preferred date.';
    // date in future
    if (new Date(date) < new Date(today)) return 'Date cannot be in the past.';
    return '';
  }

  // submit form
  $('#bookingForm').on('submit', function (e) {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      $('#formFeedback').css('color', 'crimson').text(err).show().delay(3500).fadeOut();
      return;
    }
    // build booking object
    const booking = {
      car, // includes name,img,price
      fullName: $('#fullName').val().trim(),
      email: $('#email').val().trim(),
      phone: $('#phone').val().trim(),
      date: $('#date').val(),
      months: $('#months').val(),
      notes: $('#notes').val(),
      estimatedTotal: $('#totalEstimate').text()
    };
    // store booking in localStorage bookings array (for demo)
    const key = 'autohub.bookings';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push(booking);
    localStorage.setItem(key, JSON.stringify(arr));

    // clear draft
    localStorage.removeItem(draftKey);

    // success feedback + accessible focus change
    $('#formFeedback').css('color', 'green').text('Booking received — thank you! We will contact you.').show().focus();
    // reset form for demo (keep car info)
    $('#bookingForm')[0].reset();
    computeEstimates();
  });

  // basic progressive enhancement: enter key submission on inputs
  $('input').on('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      $('#bookingForm').submit();
    }
  });
});
