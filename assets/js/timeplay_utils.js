"use strict";

// top-level object
var tpUtils = {};

/**
 * Utility function to read cookie and parse into JS object
 * @return JS object
 */
tpUtils.getCookies = function () {
  var components = document.cookie.split("; ");
  var obj = {};
  for (var i = 0; i < components.length; i++) {
    var key = components[i].split("=")[0];
    var val = components[i].split("=")[1];
    obj[key] = val;
  }
  return obj;
};

/**
 * Utility function to create a cookie
 */
tpUtils.createCookie = function (key, value) {
  document.cookie = key + "=" + value;
};

/**
 * Utility function to serialize a form into a JS object
 * Keys are names of form inputs, values are the values
 * @return JS object
 */
$.fn.serializeObject = function () {
  var elem = this;
  var arr = elem.serializeArray();
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var name = arr[i].name;
    var val = arr[i].value;
    obj[name] = val;
  }
  return obj;
};
