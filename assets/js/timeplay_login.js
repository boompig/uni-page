"use strict";

// top-level element
var tpLogin = {
  baseURL: "timeplay.cgi"
};

tpLogin.redirectToGame = function () {
  var idx = window.location.href.indexOf(tpLogin.baseURL);
  if (idx >= 0) {
    // this URL will end with a slash
    var url = window.location.href.substr(0, idx)
    window.location.href = url + tpLogin.baseURL + "/game";
  } else if (window.location.href.indexOf("/login") >= 0) {
    idx = window.location.href.indexOf("/login");
    var url = window.location.href.substr(0, idx);
    console.log(url);
    window.location.href = url + "/game";
  } else {
    window.location.href = tpLogin.baseURL + "/game";
  }
};

tpLogin.sendAuthRequest = function (name, cdf_id, password) {
  var data = { name: name, cdf_id, cdf_id, password: password };
  $.post("api/user/register", data)
  .then(function (response) {
    console.log(response);
    tpLogin.redirectToGame();
  });
};

/**
 * Called on form submit
 */
tpLogin.onSubmit = function (e) {
  e.preventDefault();
  var form = $(e.target);
  var obj = form.serializeObject();

  if (obj.name && obj.cdf_id && obj.password) {
    tpLogin.sendAuthRequest(obj.name, obj.cdf_id, obj.password);
  } else {
    console.log("Not all parameters specified");
  }

  return false;
};

/**
 * Called on page load
 */
tpLogin.onLoad = function () {
};

$(function() {
  tpLogin.onLoad();
});
