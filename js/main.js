// const map = require("leaflet-search");
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

  // xử lý scroll window hero__navbar
  $(window).on("scroll", function () {
    const scrolled = this.scrollY;
    const spaceStartHome = $(".hero").offset().top;
    const spaceEndHome = $(".howitworks").offset().top;
    const spaceStartService = $(".service").offset().top - 180;
    const spaceEndService = $(".service2__background__content__other").offset()
      .top;
    const spaceStartAbout =
      $(".service2__background__content__other").offset().top + 10;
    const spaceEndAbout = $(".cta__background__content").offset().top;
    const spaceStartContact =
      $(".cta__background__content__btn").offset().top - 100;

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

  var map = L.map("map").setView([0, 0], 2);
  L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    center: [20.5937, 78.9629],
    zoom: 5,
    zoomControl: true,
    trackResize: true,
  }).addTo(map);

  var geocoder = L.Control.geocoder({
    defaultMarkGeocode: true,
  })
    .on("markgeocode", function (e) {
      var bbox = e.geocode.bbox;
      var poly = L.polygon([
        bbox.getSouthEast(),
        // bbox.getNorthEast(),
        // bbox.getNorthWest(),
        // bbox.getSouthWest(),
      ]).addTo(map);
      map.fitBounds(poly.getBounds());
    })
    .addTo(map);
  // L.Control.geocoder().addTo(map);

  // xử lý datapicker và hero__menu
  $(".hero__menu__list__item--checkin").on("click", function () {
    $(".hero__menu__list__item--checkin span").hide();
    $("#checkin").show();
    $(function () {
      $("#checkin").datepicker({
        dateFormat: "dd/mm/yy",
      });
    });
  });

  $(".hero__menu__list__item--checkout").on("click", function () {
    $(".hero__menu__list__item--checkout span").hide();
    $("#checkout").show();
    $(function () {
      $("#checkout").datepicker({
        dateFormat: "dd/mm/yy",
      });
    });
  });

  $(".hero__menu__list__search").on("click", function () {
    const checkinValue = $("#checkin").val();
    const checkoutValue = $("#checkout").val();
    const locationValue = $("#location").text();
    $("p.checkin").text(checkinValue);
    $("p.checkout").text(checkoutValue);
    $("p.location").text(locationValue);
  });

  // event leaflet
  map.on("popupopen", function (e) {
    $(".leaflet-control-geocoder-alternatives li").on("click", function () {
      const abc = $(this).text();
      console.log(abc);
      console.log($("#location").text(abc));
    });
  });
});
