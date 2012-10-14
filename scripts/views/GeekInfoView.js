/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 10/14/12
 * Time: 6:27 PM
 */

define(['jquery', 'underscore', 'Backbone', 'text!./GeekInfoView.tpl'],
    function ($, _, Backbone, GeekInfoViewTemplate) {

        var GeekInfoView = Backbone.View.extend({

            events:{
                'click #btnBack':'btnBack_clickHandler'
            },

            render:function () {
                this.$el.html(_.template(GeekInfoViewTemplate, {geek:this.model}));
                return this;
            },

            btnBack_clickHandler:function (event) {
                $.mobile.jqmNavigator.popView();
            }

        });

        return GeekInfoView;
    });