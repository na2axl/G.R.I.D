/* **************************************************
 * G.R.I.D : popup.js v1.0.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {

    var Popup = function (element, options) {
        this.$element = $('<div/>')
            .addClass('grid-popup')
            .append($(element).addClass('grid-popup-modal'))
            .appendTo(document.body);

        this.$bg = $('<div/>').addClass('grid-popup-bg').appendTo(document.body);

        this.options = options;

        this._init();
    };

    Popup.VERSION = '1.0.0';

    Popup.DEFAULTS = {
        withClose: true,
        closeWithEsc: true,
        animationOpen: 'fadeIn',
        animationClose: 'fadeOut',
        opener: '',
        onClose: null,
        onOpen: null
    };

    Popup.prototype._init = function () {
        this.$bg
            .addClass('animated grid-popup-closed');

        this.$element
            .addClass('animated grid-popup-closed');

        var that = this;

        $(this.options.opener).each(function () {
            $(this).on('click.grid.popup.open', function (e) {
                e.preventDefault();
                e.stopPropagation();
                that.open();
            });
        });

        if (this.options.withClose) {
            $('<span/>')
                .addClass('grid-popup-closer')
                .prependTo(this.$element)
                .on('click.grid.popup.close', function () {
                    that.close();
                });
        }

        if (this.options.closeWithEsc) {
            $(window).on('keydown.grid.popup.close', function (e) {
                if (e.keyCode === 27) {
                    that.close();
                }
            });
        }

        this.$bg.on('click.grid.popup.close', function () {
            that.close();
        });
    };

    Popup.prototype.open = function () {
        var that = this;

        if (this.options.closeWithEsc) {
            $(window).on('keydown.grid.popup.close', function (e) {
                if (e.keyCode === 27) {
                    that.close();
                }
            });
        }

        this.$bg
            .removeClass('grid-popup-closed fadeOut')
            .addClass('grid-popup-opened fadeIn');

        this.$element
            .removeClass('grid-popup-closed ' + this.options.animationClose)
            .addClass('grid-popup-opened ' + this.options.animationOpen);

        if ($.isFunction(this.options.onOpen)) {
            this.options.onOpen();
        }
    };

    Popup.prototype.close = function () {
        if (this.options.closeWithEsc) {
            $(window).off('keydown.grid.popup.close');
        }

        this.$bg
            .removeClass('grid-popup-opened fadeIn')
            .addClass('fadeOut');

        this.$element
            .removeClass('grid-popup-opened ' + this.options.animationOpen)
            .addClass(this.options.animationClose);

        if ($.isFunction(this.options.onClose)) {
            this.options.onClose();
        }

        setTimeout(function () {
            this.$bg.addClass('grid-popup-closed');
            this.$element.addClass('grid-popup-closed');
        }.bind(this), 1000);
    };

    Popup.prototype.onOpen = function(callback) {
        this.options.onOpen = callback || this.options.onOpen;
        return this;
    };

    Popup.prototype.onClose = function(callback) {
        this.options.onClose = callback || this.options.onClose;
        return this;
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.popup');
        args[0]  = args[0] || {};

        if (typeof args[0] === 'object') {
            var options  = args[0];
            var params   = $.extend({}, Popup.DEFAULTS, options);
            if ($('body').find(params.element || this).length < 1) {
                return;
            }

            return $(params.element || this).each(function () {
                $(this).data('grid.popup', (data = new Popup(this, params)));
            });
        }
        else if (typeof args[0] === 'string') {
            data && data[args[0]]((!(typeof args[1] === 'undefined')) ? args[1] : void 0);
        }
    }

    var old = $.grid.popup || $.fn.popup;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.popup             = Plugin;
    $.grid.popup.Constructor = Popup;

    // Popup jQuery Extension
    // ------------------------------------------------------------
    $.fn.popup               = Plugin;
    $.fn.popup.Constructor   = Popup;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.popup.noConflict = function() {
        $.grid.popup = old;
        return this
    };

} (jQuery);