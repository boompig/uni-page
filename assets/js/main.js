$(function () {
    // close bootstrap navbar on link-click
    var navbar = $(".navbar-collapse");
    navbar.on("click", "a", null, function () {
        console.log('here');
        navbar.collapse("hide");
    });
});
