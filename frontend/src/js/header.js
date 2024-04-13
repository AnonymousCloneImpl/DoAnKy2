export default function scroll_Header() {
  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop()) {
        $('header').addClass('sticky');
        $('.top-header').hide();
      } else {
        $('header').removeClass('sticky')
        $('.top-header').show();
      }
    })
  })

  function handleSearchIconClick() {
    const inputValue = document.getElementById('searchInput').value;
    window.location.href = '/search?q=' + encodeURIComponent(inputValue);
  }

  document.getElementById('searchIcon').addEventListener('click', function () {
    handleSearchIconClick();
    document.getElementById('searchInput').value = '';
  });

  document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      handleSearchIconClick();
      document.getElementById('searchInput').value = '';
    }
  });
}
