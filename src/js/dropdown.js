/* **************************************************
 * G.R.I.D : dropdown.js v2.0.0
 * **************************************************
 * Copyright 2015-2016 Centers Technologies
 * Licensed under MIT http://opensource.org/licenses/MIT
 * *************************************************/

+function ($) {
    'use strict';

    // ------------------------------------------------------------
    // CLASS DEFINITION
    // ------------------------------------------------------------
    var Dropdown = function Dropdown(element, options) {
        this.$nav        = $(element);
        this.options     = options;
        this.$menu       = this.$nav.children('ul');
        this.$items      = this.$menu.children('li');
        this.$dropdown   = [];
        this.$subdrop    = [];
        this.hideTimeout = null;
        this._init();
    };

    Dropdown.VERSION = '2.0.0';

    Dropdown.DEFAULTS = {
        animation: 'slide',
        speed: 500,
        position: 'bottom',
        alignement: 'center'
    };

    Dropdown.prototype._init = function() {
        var that = this;

        this.$items.each(function(index) {
            var $this = $(this);
            that.$dropdown[index] = $this.children('ul')
                .hide(0)
                .clone()
                .appendTo(document.body)
                .addClass('dropdown level-0 position-'+that.options.position+' align-'+that.options.alignement)
                .hide(0);

            $(window).on('scroll.grid.dropdown.'+index, function() {
                that.$dropdown[index].css({
                    'position': 'absolute'
                }).offset(that._calculateOffset(index));
            });

            $this.on('mouseenter.grid.dropdown', function() {
                that.$dropdown[index].css({
                    'position': 'absolute'
                }).offset(that._calculateOffset(index));
                that.show(that.$dropdown[index]);
                $(window).trigger('scroll.grid.dropdown.'+index);
            });

            $this.on('mouseleave.grid.dropdown', function() {
                that.hideTimeout = setTimeout(function() {
                    that.hide(that.$dropdown[index]);
                    $(that.$subdrop[index]).each(function(idx) {
                       that.hide(that.$subdrop[index][idx]);
                    });
                }, 250);
            });

            that.$dropdown[index].on('mouseenter.grid.dropdown', function() {
                clearTimeout(that.hideTimeout);
                that.show(that.$dropdown[index]);
            });

            that.$dropdown[index].on('mouseleave.grid.dropdown', function() {
                that.hideTimeout = setTimeout(function() {
                    that.hide(that.$dropdown[index]);
                    $(that.$subdrop[index]).each(function(idx) {
                       that.hide(that.$subdrop[index][idx]);
                    });
                }, 250);
            });

            that.$dropdown[index].children('li').each(function(idx) {
                var $this = $(this);

                if (!that.$subdrop[index]) { that.$subdrop[index] = []; }
                that.$subdrop[index][idx] = $this.children('ul')
                    .hide(0)
                    .clone()
                    .appendTo(document.body)
                    .addClass('dropdown level-1')
                    .hide(0);

                $(window).on('scroll.grid.dropdown.'+index+'.'+idx, function() {
                    that.$subdrop[index][idx].css({
                        'position': 'absolute'
                    }).offset(that._calculateSubOffset(index, idx));
                });

                $this.on('mouseenter.grid.dropdown', function() {
                    that.$subdrop[index][idx].css({
                        'position': 'absolute'
                    }).offset(that._calculateSubOffset(index, idx));
                    $(that.$subdrop[index]).each(function() {
                        that.hide($(this));
                    });
                    that.show(that.$subdrop[index][idx]);
                    $(window).trigger('scroll.grid.dropdown.'+index+'.'+idx);
                });

                that.$subdrop[index][idx].on('mouseenter.grid.dropdown', function() {
                    that.$dropdown[index].trigger('mouseenter.grid.dropdown');
                    $this.trigger('mouseenter.grid.dropdown');
                    clearTimeout(that.hideTimeout);
                    that.show(that.$subdrop[index][idx]);
                });

                that.$subdrop[index][idx].on('mouseleave.grid.dropdown', function() {
                    that.hideTimeout = setTimeout(function() {
                        that.hide(that.$dropdown[index]);
                        that.hide(that.$subdrop[index][idx]);
                    }, 250);
                });
            });
        });
    };

    Dropdown.prototype._calculateOffset = function(index) {
        var aligntop  = 0;
        var alignleft = 0;

        aligntop = this.$items.eq(index).offset().top;

        if (this.options.position == 'bottom') {
            aligntop += this.$menu.outerHeight() + parseInt(this.$dropdown[index].css('margin-top'));
            if (this.options.alignement == 'left') {
                alignleft =  this.$items.eq(index).offset().left;
            }
            if (this.options.alignement == 'center') {
                var dropdownwidth = this.$dropdown[index].outerWidth();
                var liwidth       = this.$items.eq(index).outerWidth();
                var offset        = (liwidth - dropdownwidth) / 2;
                alignleft         = this.$items.eq(index).offset().left + offset;
            }
            if (this.options.alignement == 'right') {
                var dropdownwidth = this.$dropdown[index].outerWidth();
                var liwidth       = this.$items.eq(index).outerWidth();
                var offset        = liwidth - dropdownwidth;
                alignleft         = this.$items.eq(index).offset().left + offset;
            }
        }

        if (this.options.position == 'left') {
            alignleft = this.$items.eq(index).offset().left - parseInt(this.$dropdown[index].css('margin-right')) - this.$dropdown[index].outerWidth();
            aligntop  = this.$items.eq(index).offset().top;
            if (this.options.alignement == 'top') {
                aligntop += parseInt(this.$dropdown[index].css('margin-top'));
            }
            if (this.options.alignement == 'center') {
                var dropdownheight = this.$dropdown[index].outerHeight();
                var liheight       = this.$items.eq(index).outerHeight();
                var offset         = (liheight - dropdownheight) / 2;
                aligntop          += offset;
            }
            if (this.options.alignement == 'bottom') {
                var dropdownheight = this.$dropdown[index].outerHeight();
                var liheight       = this.$items.eq(index).outerHeight();
                var offset         = (liheight - dropdownheight);
                aligntop          += offset;
            }
        }

        if (this.options.position == 'top') {
            aligntop -= this.$menu.outerHeight() + parseInt(this.$dropdown[index].css('margin-bottom'));
            if (this.options.alignement == 'left') {
                alignleft =  this.$items.eq(index).offset().left;
            }
            if (this.options.alignement == 'center') {
                var dropdownwidth = this.$dropdown[index].outerWidth();
                var liwidth       = this.$items.eq(index).outerWidth();
                var offset        = (liwidth - dropdownwidth) / 2;
                alignleft         = this.$items.eq(index).offset().left + offset;
            }
            if (this.options.alignement == 'right') {
                var dropdownwidth = this.$dropdown[index].outerWidth();
                var liwidth       = this.$items.eq(index).outerWidth();
                var offset        = liwidth - dropdownwidth;
                alignleft         = this.$items.eq(index).offset().left + offset;
            }
        }

        if (this.options.position == 'right') {
            alignleft = this.$items.eq(index).offset().left + this.$items.eq(index).outerWidth() + parseInt(this.$dropdown[index].css('margin-left'));
            aligntop  = this.$items.eq(index).offset().top;
            if (this.options.alignement == 'top') {
                aligntop += parseInt(this.$dropdown[index].css('margin-top'));
            }
            if (this.options.alignement == 'center') {
                var dropdownheight = this.$dropdown[index].outerHeight();
                var liheight       = this.$items.eq(index).outerHeight();
                var offset         = (liheight - dropdownheight) / 2;
                aligntop          += offset;
            }
            if (this.options.alignement == 'bottom') {
                var dropdownheight = this.$dropdown[index].outerHeight();
                var liheight       = this.$items.eq(index).outerHeight();
                var offset         = (liheight - dropdownheight);
                aligntop          += offset;
            }
        }

        return {
            top: aligntop,
            left: alignleft
        };
    };

    Dropdown.prototype._calculateSubOffset = function(index, idx) {
        var aligntop   = 0;
        var alignleft  = 0;
        var liwidth    = this.$dropdown[index].outerWidth();
        var ulwidth    = this.$subdrop[index][idx].outerWidth();
        var canGoRight = ((this.$dropdown[index].offset().left + liwidth + ulwidth) < $(window).width());

        aligntop  = this.$dropdown[index].children('li').eq(idx).offset().top + parseInt(this.$subdrop[index][idx].css('margin-top'));
        if (canGoRight) {
            alignleft = this.$dropdown[index].offset().left + liwidth + parseInt(this.$subdrop[index][idx].css('margin-left'));
        }
        else {
            alignleft = this.$dropdown[index].offset().left - ulwidth - parseInt(this.$subdrop[index][idx].css('margin-right'));
        }

        return {
            top: aligntop,
            left: alignleft
        };
    };

    Dropdown.prototype.show = function(el) {
        $(el).stop();
        switch (this.options.animation) {
            case 'fade':
                $(el).fadeIn(this.options.speed);
            break;

            case 'slide':
                $(el).slideDown(this.options.speed);
            break;

            case 'none':
            default:
                $(el).show(0);
            break;
        }
    };

    Dropdown.prototype.hide = function(el) {
        switch (this.options.animation) {
            case 'fade':
                $(el).fadeOut(this.options.speed);
            break;

            case 'slide':
                $(el).slideUp(this.options.speed);
            break;

            case 'none':
            default:
                $(el).hide(0);
            break;
        }
    };

    // ------------------------------------------------------------
    // PLUGIN DEFINITION
    // ------------------------------------------------------------
    function Plugin() {
        var args = arguments;
        var data = $(this).data('grid.dropdown');
        args[0]  = args[0] || {};

        if (typeof args[0] == 'object') {
            var options  = args[0];
            var params   = $.extend({}, Dropdown.DEFAULTS, options);
            var $wrapper = $(params.menu || this);

            return $wrapper.each(function () {
                $(this).data('grid.dropdown', (data = new Dropdown(this, params)));
            });
        }
        else if (typeof args[0] == 'string') {
            if (typeof args[1] != 'undefined') {
                data && data[args[0]](args[1]);
            }
            else {
                data && data[args[0]]();
            }
        }
    }

    var old = $.grid.dropdown || $.fn.dropdown;

    // G.R.I.D jQuery Global Var
    // ------------------------------------------------------------
    $.grid.dropdown             = Plugin;
    $.grid.dropdown.Constructor = Dropdown;

    // Dropdown jQuery Extension
    // ------------------------------------------------------------
    $.fn.dropdown               = Plugin;
    $.fn.dropdown.Constructor   = Dropdown;

    // ------------------------------------------------------------
    // NO CONFLICT
    // ------------------------------------------------------------
    $.grid.dropdown.noConflict  = function() {
        $.grid.dropdown = old;
        return this;
    };

}(jQuery);