/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 10/14/12
 * Time: 5:45 PM
 */

define(['jquery', 'underscore', 'Backbone', 'Parse', 'text!./MainView.tpl'],
    function ($, _, Backbone, Parse, MainViewTemplate) {

        var MainView = Backbone.View.extend({

            initialize:function (options) {
            },

            render:function () {

                // Rendering MainView.tpl
                this.$el.html(MainViewTemplate);

                return this;
            }

        });

        return MainView;
    });