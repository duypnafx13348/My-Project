const lengthService = $(
  ".service__content__list .service__content__list__item"
).length;
const lengthFeature = $(".feature__menu .feature__menu__text").length;

$(document).ready(function () {
  // handleService > 4 item
  if (lengthService > 4) {
    $(".service__content__list").show();
    $(".btn-group").show();
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
    $(".btn-group").show();
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

  // xử dụng slick slider để xử lý ảnh
  $(".testimonial__content").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          infinite: true,
          speed: 300,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });

  // handleClick feature
  function handleClick() {
    let itemId = $(this).attr("data-id");

    $(".feature__menu__text").removeClass("active");
    $(`.feature__menu__text[data-id=${itemId}]`).addClass("active");

    $(".dropbtn__feature").text($(this).text());

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

  // xử lý scroll window hero__navbar
  $(window).on("scroll", function () {
    const scrolled = this.scrollY;
    console.log("scrolled", scrolled);
    const spaceStartHome = $(".hero").offset().top;
    const spaceEndHome = $(".howitworks").offset().top;
    const spaceStartService = $(".service").offset().top - 164;
    const spaceEndService = $(".service2__background__content__other").offset()
      .top;
    const spaceStartAbout = $(".testimonial__header").offset().top - 174;
    const spaceEndAbout = $(".cta__background__content").offset().top;
    const spaceStartContact =
      $(".cta__background__content__btn").offset().top - 100;

    if (scrolled == 0) {
      $(".hero__navbar").css("background", "none");
    } else {
      $(".hero__navbar").css({
        background: "#f1f1f1",
        opacity: "0.9",
        transition: "0.5s linear",
      });
    }

    if (spaceStartHome == 0 && scrolled <= spaceEndHome) {
      $(".hero ul li a").removeClass("active");
      $(".hero ul li:first-child a").addClass("active");
    } else if (spaceStartService <= scrolled && scrolled <= spaceEndService) {
      $(".hero ul li a").removeClass("active");
      $(".hero ul li:nth-child(2) a").addClass("active");
    } else if (spaceStartAbout <= scrolled && scrolled <= spaceEndAbout) {
      $(".hero ul li a").removeClass("active");
      $(".hero ul li:nth-child(3) a").addClass("active");
    } else if (spaceStartContact <= scrolled) {
      $(".hero ul li a").removeClass("active");
      $(".hero ul li:nth-child(4) a").addClass("active");
    }
  });

  // hiển thị button search trong leaflet map
  var map = L.map("map").setView([0, 0], 2);
  L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    center: [20.5937, 78.9629],
    zoom: 5,
    zoomControl: true,
    trackResize: true,
  }).addTo(map);
  L.Control.geocoder().addTo(map);

  // event leaflet popupopen để lấy giá trị search input
  map.on("popupopen", function (e) {
    const searchValue = e.popup._contentNode.innerText;
    $(".modal-footer__location__desc").text(searchValue);
    // $("#location").text(searchValue);
  });

  // xử lý datapicker và hero__menu
  $(".hero__menu__list__item--checkin").on("click", function () {
    $(".hero__menu__list__item--checkin span").hide();
    $("#checkin").show().focus();
    $("#checkin").datepicker({
      dateFormat: "dd/mm/yy",
    });
  });

  $(".hero__menu__list__item--checkout").on("click", function () {
    $(".hero__menu__list__item--checkout span").hide();
    $("#checkout").show();
    $("#checkout").datepicker({
      dateFormat: "dd/mm/yy",
    });
  });

  $(".hero__menu__list__search").on("click", function () {
    const locationValue = $("#location").text();
    const checkinValue = $("#checkin").val();
    const checkoutValue = $("#checkout").val();
    $("span.location").text(locationValue);
    $("span.checkin").text(checkinValue);
    $("span.checkout").text(checkoutValue);
  });

  $(".modal-footer .save").on("click", function () {
    $("#location").text($(".modal-footer__location__desc").text());
  });

  $(".hero__menu__modal__close").on("click", function () {
    $("#location").text("Where are you going ?");
    $("#checkin").hide();
    $(".hero__menu__list__item--checkin span").show();
    $("#checkout").hide();
    $(".hero__menu__list__item--checkout span").show();
  });

  $(".navbar__signup").on("click", function () {
    $("#myModal").on("shown.bs.modal", function () {
      $("#myInput").trigger("focus");
    });

    console.log("signup");
  });
});
