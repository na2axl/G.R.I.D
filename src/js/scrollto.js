/* **************************************************
 * G.R.I.D : scrollto.js v2.0.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var ScrollTo = function ScrollTo(element, options) {
        this.$element = $(element);
        this.options  = options;

        this._init();
    };

    ScrollTo.VERSION = '2.0.0';

    ScrollTo.DEFAULTS = {
        anchor: "top",
        axis: 'y',
        offset: 0,
        speed: 500
    };

    ScrollTo.prototype._init = function() {
        var that = this;
        this.$element.on('click.grid.scrollTo', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switch (that.options.axis) {
                case 'xy':
                    $('body,html').animate(that._calculateOffset($(this).attr('href')), that.options.speed, 'swing');
                break;

                case 'x':
                    $('body,html').animate({scrollLeft: that._calculateOffset($(this).attr('href')).scrollLeft}, that.options.speed, 'swing');
                break;

                case 'y':
                default:
                    $('body,html').animate({scrollTop: that._calculateOffset($(this).attr('href')).scrollTop}, that.options.speed, 'swing');
                break;
            }
        });
    };

    ScrollTo.prototype._calculateOffset = function(element) {
        var $element  = $(element);
        var aligntop  = $element.offset().top;
        var alignleft = $element.offset().left;

        if (this.options.anchor == 'middle') {
            aligntop -= ($(window).height() - $element.outerHeight()) / 2;
        }

        if (this.options.anchor == 'bottom') {
            aligntop -= $(window).height() - $element.outerHeight();
        }

        if (typeof this.options.offset == 'object') {
            aligntop  += this.options.offset.top;
            alignleft += this.options.offset.left;
        }
        else {
            aligntop  += this.options.offset;
            alignleft += this.options.offset;
        }

        return {
            scrollTop:  aligntop,
            scrollLeft: alignleft
        };

    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin(options) {
        var params   = $.extend({}, ScrollTo.DEFAULTS, typeof options == 'object' && options);
        var $wrapper = $(params.scroller || this);

        return $wrapper.each(function () {
            $(this).data('grid.scrollTo', (new ScrollTo(this, params)));
        });
    }

    var old = $.grid.scrollTo || $.fn.scrollTo;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.scrollTo             = Plugin;
    $.grid.scrollTo.Constructor = ScrollTo;

    // ScrollTo jQuery Extension
    // ------------------------------------------------------------
    $.fn.scrollTo               = Plugin;
    $.fn.scrollTo.Constructor   = ScrollTo;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.scrollTo.noConflict  = function() {
        $.grid.scrollTo = old;
        return this;
    };

}(jQuery);