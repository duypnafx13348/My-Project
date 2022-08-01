$(document).ready(function () {
  // hiện form đăng ký
  const signupFormTab = function (e) {
    console.log("1");
    $(".box-login").fadeOut(500);
    $(".box-signup").fadeIn(1500);
    e.preventDefault();
  };

  // validate form signup & save localStorage with jquery
  const validateSignup = function () {
    console.log("3");
    const emailVal = $(".signup__email input").val();
    const dataUser = JSON.parse(localStorage.getItem("user")) || [];
    const isExist = dataUser.some((user) => {
      return emailVal.toLowerCase() == user.email.toLowerCase();
    });
    if (isExist) {
      $(".signup__email-error").show();
    } else {
      dataUser.push({
        id: (Math.random() * 10000).toFixed(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      });

      const json = JSON.stringify(dataUser);

      localStorage.setItem("user", json);
      alert("Đăng ký thành công!!!");
      $(".box-login").fadeIn(1500);
      $(".box-signup").fadeOut(500);
    }
  };

  const handleSignupValidate = function () {
    console.log("2");
    $("#signupform").validate({
      onkeyup: false,
      rules: {
        firstname: {
          required: true,
        },
        lastname: {
          required: true,
        },
        email: {
          required: true,
        },
        password: {
          required: true,
          rangelength: [3, 12],
        },
        confirmpassword: {
          required: true,
          equalTo: "#password",
        },
      },
      messages: {
        firstname: {
          required: "This field is required.",
        },
        lastname: {
          required: "This field is required.",
        },
        email: {
          required: "This field is required.",
          email: "Please enter a valid email address",
        },
        password: {
          required: "This field is required.",
          rangelength: "Please enter a value between 3 and 12 characters long.",
        },
        confirmpassword: {
          required: "This field is required.",
          equalTo: "Please enter the same value again.",
        },
      },
      checkboxHandler: $(".box__checkbox input").on("click", function () {
        const check = $(".box__checkbox input").is(":checked");
        check
          ? $(".box__submit input").attr("disabled", false)
          : $(".box__submit input").attr("disabled");
      }),
      submitHandler: validateSignup,
    });
  };

  // handle button Cancel
  const handleCancel = function () {
    $(".box-login").fadeIn(1500);
    $(".box-signup").fadeOut(500);
  };

  // validate form login with jquery
  const validateLogin = function (e) {
    console.log("5");

    const emailVal = $(".login__email input").val();
    const passwordVal = $(".login__password input").val();
    const dataUser = JSON.parse(localStorage.getItem("user"));

    const isExistEmail = dataUser.filter((user, index) => {
      return emailVal.toLowerCase() == user.email.toLowerCase();
    });

    if (isExistEmail && isExistEmail != "" && isExistEmail != null) {
      const isExistPassword = dataUser.some((user) => {
        return passwordVal.toLowerCase() == user.password.toLowerCase();
      });

      if (isExistPassword) {
        isExistEmail[0].isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(isExistEmail));
        location.replace(
          "https://duypnafx13348.github.io/My-Project/index.html"
          // "/"
        );
      } else {
        $(".box__error-message").show();
      }
    } else {
      $(".box__error-message").show();
    }
  };

  const handleLoginValidate = function () {
    console.log("4");
    $("#loginform").validate({
      rules: {
        email: {
          required: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        email: {
          required: "This field is required.",
        },
        password: {
          required: "This field is required.",
        },
      },
      submitHandler: validateLogin,
    });
  };

  // regex password strength
  const regexPassword = function () {
    const indicator = $(".signup__password__indicator");
    const inputPw = $(".signup__password input").val();
    const weak = $(".weak");
    const medium = $(".medium");
    const strong = $(".strong");
    const text = $(".signup__password__text");
    let regexWeak = /[a-z]/;
    let regexMedium = /[A-Z0-9]/;
    let regexStrong = /.[!,@,#,$,%,^,&,*,?,...,~,-,(,)]/;

    if (inputPw != "" && inputPw.length >= 3) {
      if (
        (inputPw.length >= 3 && inputPw.match(regexWeak)) ||
        inputPw.match(regexMedium) ||
        inputPw.match(regexStrong)
      ) {
        weak.addClass("active");
        text.show().text("Your password is too weak.").addClass("weak");
      }

      if (
        (inputPw.length >= 6 &&
          inputPw.match(regexWeak) &&
          inputPw.match(regexMedium)) ||
        (inputPw.match(regexMedium) && inputPw.match(regexStrong)) ||
        (inputPw.match(regexWeak) && inputPw.match(regexStrong))
      ) {
        weak.addClass("active");
        medium.addClass("active");
        text.show().text("Your password is medium.").addClass("medium");
      } else {
        medium.removeClass("active");
        text.removeClass("medium");
      }

      if (
        inputPw.length >= 8 &&
        inputPw.match(regexWeak) &&
        inputPw.match(regexMedium) &&
        inputPw.match(regexStrong)
      ) {
        weak.addClass("active");
        medium.addClass("active");
        strong.addClass("active");
        text.show().text("Your password is strong.").addClass("strong");
      } else {
        strong.removeClass("active");
        text.removeClass("strong");
      }
    } else {
      weak.removeClass("active");
      medium.removeClass("active");
      strong.removeClass("active");
      text.removeClass("weak");
      text.removeClass("medium");
      text.removeClass("strong");
      text.text(
        "Use 8 or more characters with a mix of letters, numbers & symbols."
      );
    }
  };

  $("#signup").on("click", signupFormTab);
  handleSignupValidate();
  $(".signup__password input").on("input", regexPassword);
  handleLoginValidate();
  $(".box__cancel input[type=button]").on("click", handleCancel);
});
