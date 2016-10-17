/* **************************************************
 * G.R.I.D : carousel.js v2.1.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var MenuToggle = function MenuToggle(element, options) {
        var that = this;

        this.options  = options;

        this.$nav     = $(element);
        this.$menu    = this.$nav.children('ul');
        this.$submenu = this.$nav.children('ul').children('li').children('ul');
        this.$items   = this.$menu.children('li');

        var bodyWidth = $(document.body).outerWidth();

        this.menuIsCreated = false;

        $(window).on('resize.grid.menuToggle', function () {
            that.toggleMenu($(document.body).outerWidth());
        });

        this.toggleMenu(bodyWidth);
    };

    MenuToggle.VERSION = '2.1.0';

    MenuToggle.DEFAULTS = {
        breakPoint: GRID.breakPoints.mobile,
        wrapper: "body",
        animation: "slide-left",
        closeText: false,
        menuOpenerClass: "grid-phone-menu-toggle-button",
        closeOnScroll: false
    };

    MenuToggle.prototype._init = function () {
        this.body = document.body;
        this.wrapper = document.querySelector(this.options.wrapper);
        this.mask = document.querySelector('#grid-phone-menu-mask');
        this.menu = document.querySelector('#grid-phone-menu--' + this.options.animation);
        this.closeBtn = this.menu.querySelector('.grid-phone-menu__close');
        this.menuOpeners = document.querySelectorAll('.'+this.options.menuOpenerClass);
        this.wrapper.classList.add('grid-phone-menu-wrapper');
        this._initEvents();
    };

    MenuToggle.prototype._initEvents = function () {
        $(this.closeBtn).on('click.grid.menutoggle', function (e) {
            e.preventDefault();
            this.close();
        }.bind(this));

        $(this.mask).on('click.grid.menutoggle', function (e) {
            e.preventDefault();
            this.close();
        }.bind(this));

        if (this.options.closeOnScroll === true) {
            $(window).on('scroll.grid.menutoggle', function (e) {
                e.preventDefault();
                this.close();
            }.bind(this));
        }
    };

    MenuToggle.prototype.open = function () {
        this.body.classList.add('grid-phone-menu-page-has-active-menu');
        this.wrapper.classList.add('grid-phone-menu-page-has-' + this.options.animation);
        this.menu.classList.add('is-active');
        this.mask.classList.add('is-active');
        this.disableMenuOpeners();
    };

    MenuToggle.prototype.close = function () {
        this.body.classList.remove('grid-phone-menu-page-has-active-menu');
        this.wrapper.classList.remove('grid-phone-menu-page-has-' + this.options.animation);
        this.menu.classList.remove('is-active');
        this.mask.classList.remove('is-active');
        this.enableMenuOpeners();
    };

    MenuToggle.prototype.disableMenuOpeners = function () {
        $(this.menuOpeners).each(function () {
            this.disabled = true;
        });
    };

    MenuToggle.prototype.enableMenuOpeners = function () {
        $(this.menuOpeners).each(function () {
            this.disabled = false;
        });
    };

    MenuToggle.prototype.create_menu = function () {
        if (!this.menuIsCreated) {
            var $mask = $('<div id="grid-phone-menu-mask"></div>'),
                $butt = $('<div id="grid-phone-menu-button--' + this.options.animation + '" class="' + this.options.menuOpenerClass + '"><span></span></div>'),
                $pnav = $('<nav id="grid-phone-menu--' + this.options.animation + '" class="' + this.options.animation + ' grid-phone-menu"></nav>'),
                $cmenu = $('<ul class="alt-menu"></ul>');

            if (this.closeText) {
                var $close = $('<li class="menu-item grid-phone-menu__close"><a href="javascript:;">' + this.options.closeText + '</a></li>');
                $cmenu.prepend($close);
            }

            this.$items.each(function () {
                var $i = $(this);
                $i.addClass('menu-item level-0').clone().appendTo($cmenu).find('ul').remove();
                var $a = $i.children('ul').children('li');
                $a.each(function () {
                    $(this).addClass('menu-item level-1').clone().remove('ul').appendTo($cmenu).find('ul').remove();
                    var $b = $(this).children('ul').children('li');
                    $b.each(function () {
                        $(this).addClass('menu-item level-2').clone().remove('ul').appendTo($cmenu).find('ul').remove();
                    });
                });
            });

            $pnav.prepend($cmenu);
            $(this.options.wrapper).prepend($mask);
            $(this.options.wrapper).prepend($pnav);
            $(document.body).prepend($butt);

            this.menuIsCreated = true;

            this.init_menu();
        }
    };

    MenuToggle.prototype.remove_menu = function () {
        if (this.menuIsCreated) {
            $('div#grid-phone-menu-button--' + this.options.animation).remove();
            $('nav#grid-phone-menu--' + this.options.animation).remove();
            $('div#grid-phone-menu-mask').remove();
            this.menuIsCreated = false;
        }
    };

    MenuToggle.prototype.init_menu = function () {
        var that = this;
        this._init();
        $('div#grid-phone-menu-button--' + this.options.animation).on('click.grid.menutoggle', function (e) {
            e.preventDefault();
            that.open();
        });
    };

    MenuToggle.prototype.toggleMenu = function (minWidth) {
        if (minWidth <= this.options.breakPoint) {
            this.create_menu();
            this.$nav.css('display', 'none');
        }
        else {
            this.remove_menu();
            this.$nav.css('display', 'block');
        }
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.menuToggle');
        args[0]  = args[0] || {};

        if (typeof args[0] === 'object') {
            var options  = args[0];
            var params   = $.extend({}, MenuToggle.DEFAULTS, options);
            var $wrapper = $(params.menu || this);

            return $wrapper.each(function () {
                $(this).data('grid.menuToggle', (new MenuToggle(this, params)));
            });
        }
        else if (typeof args[0] === 'string') {
            data && data[args[0]]((!(typeof args[1] === 'undefined')) ? args[1] : null);
        }
    }

    var old = $.grid.menuToggle || $.fn.menuToggle;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.menuToggle             = Plugin;
    $.grid.menuToggle.Constructor = MenuToggle;

    // MenuToggle jQuery Extension
    // ------------------------------------------------------------
    $.fn.menuToggle               = Plugin;
    $.fn.menuToggle.Constructor   = MenuToggle;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.menuToggle.noConflict  = function() {
        $.grid.menuToggle = old;
        return this;
    };

} (jQuery);
