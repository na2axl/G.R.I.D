/* **************************************************
 * G.R.I.D : panels.js v2.1.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var Panels = function Panels(element, options) {
        var that = this;

        this.$element = $(element);
        this.options  = options;
        this.$parent  = this.$element.parent('.grid-panels-wrapper');
        this.$panels  = this.$element.find('.grid-panels-item');
        this.$buttons = this.$parent.find('.grid-panels-switcher');

        this.currpanel = '#' + this.$panels.eq(0).attr('id');
        this.prevpanel = null;

        this._init();
    };

    Panels.VERSION = '2.1.0';

    Panels.DEFAULTS = {
        element: ".grid-panels",
        speed: 500
    };

    Panels.prototype._init = function() {
        var that = this;

        this.$panels.each(function(index) {
            if (index > 0) {
                $(this).hide();
            }
        });

        this.$buttons.each(function() {
            var $a = $(this);
            $a.on('click.grid.panels', function(e) {
                if ($a.hasClass('disable-switch')) {
                    return false;
                }
                else {
                    if (that.currpanel != $a.attr('href')) {
                        that.prevpanel = that.currpanel;
                        that.currpanel = $a.attr('href');
                        that.update_panels();
                    }
                }
                e.preventDefault();
                e.stopPropagation();
            });
        });
    };

    Panels.prototype.update_panels = function() {
        var that = this;

        this.$buttons.removeClass('active');
        this.$buttons.filter('[href="' + this.currpanel + '"]').addClass('active');

        $(this.prevpanel).fadeOut(this.options.speed, (function (that) {
            return function() {
                that.$element.animate({
                    height: $(that.currpanel).outerHeight()
                }, that.options.speed, 'swing', function() {
                    $(that.currpanel).fadeIn(that.options.speed);
                });
            }
        })(this));
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin(options) {
        var params   = $.extend({}, Panels.DEFAULTS, typeof options === 'object' && options);
        if ($('body').find(params.element || this).length < 1) {
            return;
        }

        return $(params.element || this).each(function () {
            $(this).data('grid.panels', (new Panels(this, params)));
        });
    }

    var old = $.grid.panels || $.fn.panels;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.panels             = Plugin;
    $.grid.panels.Constructor = Panels;

    // Panels jQuery Extension
    // ------------------------------------------------------------
    $.fn.panels               = Plugin;
    $.fn.panels.Constructor   = Panels;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.panels.noConflict  = function() {
        $.grid.panels = old;
        return this;
    };

} (jQuery);
