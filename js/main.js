const smallDesktop = $(window).width();
const lengthService = $(
  ".service__content__list .service__content__list__item"
).length;
const lengthFeature = $(".feature__menu .feature__menu__text").length;

$(document).ready(function () {
  // handleService > 4 item
  if (lengthService > 4) {
    $(".service__content__list").show();
    $(".dropdown__service").show();
  }

  // handleClick service
  function handleClickService() {
    let serviceId = $(this).attr("service-id");

    $(".service__content__list__item").removeClass("service-active");

    $(`.service__content__list__item[service-id=${serviceId}]`).addClass(
      "service-active"
    );

    // thay đổi nội dung của dropbtn__service
    $(".dropbtn__service").text($(this).text());
    $(`.service__content__list__item[service-id=${serviceId}]`).text(
      $(this).text()
    );

    let imgId = $(`.service__content__img[service-id=${serviceId}]`);
    $(".service__content__img").hide();
    imgId.show();
    imgId.slick("refresh");
  }

  $(".service__content__img").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".service__content__img:not(:first-child)").hide();
  $(".service__content__list__item").on("click", handleClickService);
  $(".dropdown-content__service").on("click", handleClickService);

  // handle feature > 5 item
  if (lengthFeature > 5) {
    $(".feature__menu").hide();
    $(".dropdown").show();
  }

  // xử dụng slick slider để xử lý ảnh
  $(".feature__img__list").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  // handleClick feature
  function handleClick() {
    let itemId = $(this).attr("data-id");

    $(".feature__menu__text").removeClass("active");
    $(`.feature__menu__text[data-id=${itemId}]`).addClass("active");

    $(".dropbtn").text($(this).text());

    console.log(itemId);
    let sliderId = $(`.feature__img__list[data-id=${itemId}]`);
    console.log(sliderId);
    $(".feature__img__list").hide();
    sliderId.show();
    sliderId.slick("refresh");
  }

  // ẩn tất cả ảnh feature trừ cái đầu tiên
  $(".feature__img__list:not(:first-child)").hide();

  // xử lý event click feature
  $(".feature__menu__text").on("click", handleClick);
  $(".dropdown-content__item").on("click", handleClick);
});
