const lengthService = $(
  ".service__content__list .service__content__list__item"
).length;
const lengthFeature = $(".feature__menu .feature__menu__text").length;
const dataUser = JSON.parse(localStorage.getItem("user"));

// handle Login Logout
if (dataUser) {
  const isLoggedIn = dataUser.filter((user) => user.isLoggedIn);
  if (isLoggedIn == "") {
    $(".navbar__signup").text("Sign up");
    $(".hero__menu__modal__name h5").text("");
  } else {
    $(".navbar__signup").text("Log out");
    $(".hero__menu__modal__name h5").text(
      `${isLoggedIn[0].firstname} ${isLoggedIn[0].lastname}`
    );
  }
} else {
  $(".navbar__signup").text("Sign up");
  $(".hero__menu__modal__name h5").text("");
}

// handleService > 4 item
if (lengthService > 4) {
  $(".service__content__list").show();
  $(".btn-group").show();
}

// handle feature > 5 item
if (lengthFeature > 5) {
  $(".feature__menu").hide();
  $(".btn-group").show();
}

$(document).ready(function () {
  // xử dụng slick slider để xử lý ảnh
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

  $(".feature__img__list").slick({
    dots: true,
    infinite: true,
    speed: 500,
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

  $(".testimonial__content").slick({
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          infinite: true,
          speed: 1000,
          slidesToShow: 2,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  });

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

  // handleClick feature
  function handleClickFeature() {
    let itemId = $(this).attr("data-id");

    $(".feature__menu__text").removeClass("active");
    $(`.feature__menu__text[data-id=${itemId}]`).addClass("active");

    $(".dropbtn__feature").text($(this).text());

    let sliderId = $(`.feature__img__list[data-id=${itemId}]`);
    $(".feature__img__list").hide();
    sliderId.show();
    sliderId.slick("refresh");
  }

  $(".service__content__img:not(:first-child)").hide();
  $(".service__content__list__item").on("click", handleClickService);
  $(".dropdown-content__service").on("click", handleClickService);

  // ẩn tất cả ảnh feature trừ cái đầu tiên
  $(".feature__img__list:not(:first-child)").hide();

  // xử lý event click feature
  $(".feature__menu__text").on("click", handleClickFeature);
  $(".dropdown-content__item").on("click", handleClickFeature);

  // xử lý scroll window hero__navbar
  function handleScrollY() {
    let targetDistance = 180;
    const scrolled = this.scrollY;
    const spaceStartService = $("#service").offset().top - targetDistance;
    const spaceStartAbout = $("#testimonial").offset().top - targetDistance;
    const spaceStartContact = $("#cta").offset().top;

    if (scrolled == 0 && $(window).width() > 992) {
      $(".hero__navbar").css("background", "none");
    } else {
      $(".hero__navbar").css({
        background: "#f1f1f1",
        opacity: "1",
        transition: "0.5s linear",
      });
    }

    if (scrolled < spaceStartService) {
      $(".hero ul li a").removeClass("active");
      $(".hero ul li:first-child a").addClass("active");
    } else if (scrolled < spaceStartAbout) {
      $(".hero ul li a").removeClass("active");
      $(".hero ul li:nth-child(2) a").addClass("active");
    } else if (scrolled < spaceStartContact) {
      $(".hero ul li a").removeClass("active");
      $(".hero ul li:nth-child(3) a").addClass("active");
    } else {
      $(".hero ul li a").removeClass("active");
      $(".hero ul li:nth-child(4) a").addClass("active");
    }
  }
  $(window).on("scroll", handleScrollY);

  // Click navbar item
  function handleClickNav() {
    const getAttr = $(this).attr("href");
    if ($(getAttr)) {
      let getOffset = $(getAttr).offset().top;
      let targetDistance = 95;
      $("html,body").animate(
        {
          scrollTop: getOffset - targetDistance,
        },
        1000
      );
    }
    return false;
  }
  $(".scrollTo").on("click", handleClickNav);

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
    $("#checkout").show().focus();
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

  $(".modal-footer .btn-save").on("click", function () {
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
    if (!dataUser) {
      return window.location.replace(
        "https://duypnafx13348.github.io/My-Project/signup.html"
        // "/signup.html"
      );
    }
    const isLoggedIn = dataUser.filter((user) => user.isLoggedIn);
    if (isLoggedIn != "") {
      isLoggedIn[0].isLoggedIn = false;
      localStorage.setItem("user", JSON.stringify(dataUser));
      window.location.replace(
        "https://duypnafx13348.github.io/My-Project/signup.html"
        // "/signup.html"
      );
    } else {
      window.location.replace(
        "https://duypnafx13348.github.io/My-Project/signup.html"
        // "/signup.html"
      );
    }
  });
});
