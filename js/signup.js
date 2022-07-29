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
      submitHandler: validateSignup,
    });
  };

  // validate form login with jquery
  const validateLogin = function () {
    console.log("5");
    const emailVal = $(".login__email input").val();
    const passwordVal = $(".login__password input").val();
    const dataUser = JSON.parse(localStorage.getItem("user"));
    const isExistEmail = dataUser.some((user) => {
      return emailVal.toLowerCase() == user.email.toLowerCase();
    });
    if (isExistEmail) {
      const isExistPassword = dataUser.some((user) => {
        return passwordVal.toLowerCase() == user.password.toLowerCase();
      });
      console.log("isExistPassword", isExistPassword);
      if (isExistPassword) {
        location.replace("/");
        localStorage.setItem("isLoggedIn", true);
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
      onfocusout: false,
      onkeyup: false,
      onclick: false,
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

  // handle button Cancel in Sign up
  const handleCancel = function () {
    console.log("4");
    $(".box-login").fadeIn(1500);
    $(".box-signup").fadeOut(500);
  };

  $("#signup").on("click", signupFormTab);
  handleSignupValidate();
  handleLoginValidate();
  $(".box__cancel input[type=button]").on("click", handleCancel);
});
