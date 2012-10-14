/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 10/14/12
 * Time: 6:06 PM
 */

define(['jquery', 'underscore', 'Backbone', './GeekInfoView', 'text!./GeeksListItemRenderer.tpl'],
    function ($, _, Backbone, GeekInfoView, GeeksListItemRendererTemplate) {

        var GeeksListItemRenderer = Backbone.View.extend({

            tagName:'li',

            events:{
                'click':'li_clickHandler'
            },

            render:function () {

                // Rendering LI element based on template
                this.$el.html(_.template(GeeksListItemRendererTemplate, {
                    userLocation:this.model,
                    geek:this.model.get('user')
                }));

                return this;
            },

            li_clickHandler:function (event) {
                $.mobile.jqmNavigator.pushView(new GeekInfoView({model:this.model.get('user')}));
            }

        });

        return GeeksListItemRenderer;
    });