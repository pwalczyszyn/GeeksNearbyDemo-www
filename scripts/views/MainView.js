/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 10/14/12
 * Time: 5:45 PM
 */

define(['jquery', 'underscore', 'Backbone', 'Parse', './GeeksListItemRenderer', 'text!./MainView.tpl'],
    function ($, _, Backbone, Parse, GeeksListItemRenderer, MainViewTemplate) {

        var MainView = Backbone.View.extend({

            events:{
                'pageshow':'findGeeksNearby'
            },

            initialize:function (options) {
                // Initializing Parse APIs
                Parse.initialize('DeE1IIk6SSWxDVAiywycW78jUBA4ZXXT1nZrFfoV', 'QsKQMMV9tQLMiO9GfSh305qP6cy3gqfqCTSQyFEP');
            },

            render:function () {

                // Rendering MainView.tpl
                this.$el.html(MainViewTemplate);

                return this;
            },

            findGeeksNearby:function () {
                // Using GeoLocation API
                navigator.geolocation.getCurrentPosition(
                    this.getCurrentPosition_successHandler, // Success callback
                    this.getCurrentPosition_errorHandler, // Error callback
                    {maximumAge:3000, timeout:5000, enableHighAccuracy:true} // Geolocation options
                );
            },

            getCurrentPosition_successHandler:function (position) {

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

                            // Creating new list item
                            var renderer = new GeeksListItemRenderer({model:userLocation});

                            // Pushing to array
                            items.push(renderer.render().el);
                        });

                        $('#lstGeeksNearby').html(items).listview('refresh');

                    }, error:function (error) {
                        $.mobile.hidePageLoadingMsg();
                        navigator.notification.alert('error ' + error.message + ' code: ' + error.code, null, 'Error');
                    }
                });
            },

            getCurrentPosition_errorHandler:function (error) {
                // Something went wrong, showing alert box
                navigator.notification.alert('Could\'t obtain your location please try again!', null, 'Error');
            }

        });

        return MainView;
    });