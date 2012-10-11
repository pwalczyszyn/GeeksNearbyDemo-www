/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 10/10/12
 * Time: 6:01 PM
 */

var selectedGeek;

function onBodyLoad() {

    if (navigator.userAgent.match(/(iPad|iPhone|Android)/))
        document.addEventListener('deviceready', onDeviceReady, false);
    else
        onDeviceReady();

    // Listening for clicks on #lstGeeksNearby list items
    $('#lstGeeksNearby li').click(function (event) {

        // Setting selected geek instance
        selectedGeek = $(event.currentTarget).jqmData('user');

        // This is just for debugging
        if (selectedGeek == undefined) selectedGeek = {escape:function (propName) {
            return 'jsmith';
        }};

        // Transitioning to details page
        $.mobile.changePage('#details');

    });
}

function onDeviceReady() {
    // Initializing Parse APIs
    Parse.initialize('DeE1IIk6SSWxDVAiywycW78jUBA4ZXXT1nZrFfoV', 'QsKQMMV9tQLMiO9GfSh305qP6cy3gqfqCTSQyFEP');

    // Loading geeks nearby
    findGeeksNearby();
}

function findGeeksNearby() {
    // Using GeoLocation API
    navigator.geolocation.getCurrentPosition(getCurrentPosition_successHandler, getCurrentPosition_errorHandler,
        {maximumAge:3000, timeout:5000, enableHighAccuracy:true}
    );
}

function getCurrentPosition_successHandler(position) {

    // Defining UserLocation type
    var UserLocation = Parse.Object.extend('UserLocation'),

    // Creating a Parse query
        locQuery = new Parse.Query(UserLocation),

    // Coords property
        coords = position.coords;

    // Searching for checkedin users in 100 meters distance
    locQuery.withinKilometers('coords',
        new Parse.GeoPoint({latitude:coords.latitude, longitude:coords.longitude}),
        0.1 // 100 meters range
    );

    // Returning results array should include referenced User object
    locQuery.include("user");

    // Results should be sorted descending by createdAt date
    locQuery.descending("createdAt");

    // Show loading message
    $.mobile.showPageLoadingMsg('a', 'Loading geeks nearby...');

    // Execute the query
    locQuery.find({
        success:function (results) {

            // Hide loading message
            if ($.mobile) $.mobile.hidePageLoadingMsg();

            // Iterate through the results
            var items = [];
            results.forEach(function (userLocation) {

                var user = userLocation.get('user');

                if (user) {
                    // Creating new list item
                    var $item = $('<li>'
                        + '<a href="#">'
                        + '<img src="'
                        + (user.get('avatar') ? user.get('avatar').url : 'images/avatar-dark.png')
                        + '" />'
                        + '<h3>' + user.escape('username') + '</h3>'
                        + '<p>' + user.escape('fullName') + '</p>'
                        + '<p class="ui-li-aside">' + userLocation.createdAt + '</p>'
                        + '</a>'
                        + '</li>').jqmData('user', user);

                    items.push($item[0]);
                }

            });

            $('#lstGeeksNearby').html(items).listview('refresh');

        }, error:function (error) {
            $.mobile.hidePageLoadingMsg();
            navigator.notification.alert('error ' + error.message + ' code: ' + error.code, null, 'Error');
        }
    });
}

function getCurrentPosition_errorHandler(error) {
    // Something went wrong, showing alert box
    navigator.notification.alert('Could\'t obtain your location please try again!', null, 'Error');
}