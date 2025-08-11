// shop.js
// Dependencies: jQuery 3.6 (included in page)
$(function () {
  // Show year
  $('#year').text(new Date().getFullYear());

  // Accessible keyboard behavior: Enter on card opens view
  $('.card').on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).find('.view-details').trigger('click');
    }
  });

  // Fade/slide-in reveal on scroll
  function reveal() {
    $('.card').each(function () {
      const rect = this.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        $(this).css({opacity: 0, transform: 'translateY(20px)'}).animate({opacity: 1, top: 0, transform: 'translateY(0px)'}, 600);
      }
    });
  }
  $(window).on('scroll resize', reveal);
  reveal();

  // Filtering & search
  $('#filter').on('change', function () {
    const val = $(this).val();
    $('.card').each(function () {
      const type = $(this).data('type');
      $(this).toggle(val === 'all' ? true : type === val);
    });
  });

  $('#search').on('input', function () {
    const q = $(this).val().toLowerCase();
    $('.card').each(function () {
      const title = $(this).find('h3').text().toLowerCase();
      const desc = $(this).data('desc').toLowerCase();
      $(this).toggle(title.indexOf(q) !== -1 || desc.indexOf(q) !== -1);
    });
  });

  // Click: View details -> store selected car and go to booking page
  function storeAndNavigate($card) {
    const car = {
      name: $card.find('h3').text(),
      img: $card.data('img'),
      desc: $card.data('desc'),
      price: $card.data('price')
    };
    localStorage.setItem('autohub.selectedCar', JSON.stringify(car));
    window.location.href = 'booking.html';
  }

  $('.view-details').on('click', function (e) {
    const $card = $(this).closest('.card');
    storeAndNavigate($card);
  });

  $('.book-now').on('click', function (e) {
    const $card = $(this).closest('.card');
    storeAndNavigate($card);
  });

  // Focus styles for keyboard users
  $(document).on('keyup', function (e) {
    if (e.key === 'Tab') $('body').addClass('show-focus');
  });
});
