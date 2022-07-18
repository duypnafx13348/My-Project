const smallDesktop = $(window).width();

$(document).ready(() => {
  $(".service__content__img").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

  //   $(".feature__img").slick({
  //     dots: true,
  //     infinite: true,
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //   });

  const lengthFeature = $(".feature__menu .feature__menu__text").length;
  if (lengthFeature > 5) {
    console.log(lengthFeature);
    $(".feature__menu").hide();
    $(".dropdown").show();
  }
});
