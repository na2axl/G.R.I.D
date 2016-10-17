/* **************************************************
 * G.R.I.D : dropdown.js v2.1.0
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
        this.showTimeout = null;
        this._init();
    };

    Dropdown.VERSION = '2.1.0';

    Dropdown.DEFAULTS = {
        animation: 'slide',
        speed: 500,
        offset: 0,
        timeOut: 0,
        position: 'bottom',
        alignment: 'center',
        showOn: 'mouseover'
    };

    Dropdown.prototype._init = function(element, parent, level) {
        var that = this;

        this.$items.each(function(index) {
            var $this = $(this);
            that.$dropdown[index] = $this.children('ul')
                .hide(0)
                .clone()
                .appendTo(document.body)
                .addClass('grid-dropdown grid-dropdown-level-0 grid-dropdown-position-'+that.options.position+' grid-dropdown-alignment-'+that.options.alignment)
                .hide(0);

            $(window).on('scroll.grid.dropdown.'+index, function() {
                that.$dropdown[index].css({
                    'position': 'absolute'
                }).offset(that._calculateOffset(index));
            });

            var event;
            if (that.options.showOn === 'click') {
                event = 'click.grid.dropdown';
            } else {
                event = 'mouseenter.grid.dropdown';
            }

            $this.on(event, function () {
                that.showTimeout = setTimeout(function() {
                    that.$dropdown[index].css({
                        'position': 'absolute'
                    }).offset(that._calculateOffset(index));
                    that.show(that.$dropdown[index]);
                    $(window).trigger('scroll.grid.dropdown.' + index);
                }, that.options.timeOut);
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
                that.showTimeout = setTimeout(function() {
                    that.show(that.$dropdown[index]);
                }, that.options.timeOut);
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
                    .addClass('grid-dropdown grid-dropdown-level-1')
                    .hide(0);

                $(window).on('scroll.grid.dropdown.'+index+'.'+idx, function() {
                    that.$subdrop[index][idx].css({
                        'position': 'absolute'
                    }).offset(that._calculateSubOffset(index, idx));
                });

                $this.on(event, function() {
                    that.showTimeout = setTimeout(function() {
                        that.$subdrop[index][idx].css({
                            'position': 'absolute'
                        }).offset(that._calculateSubOffset(index, idx));
                        $(that.$subdrop[index]).each(function() {
                            that.hide($(this));
                        });
                        that.show(that.$subdrop[index][idx]);
                        $(window).trigger('scroll.grid.dropdown.'+index+'.'+idx);
                    }, that.options.timeOut);
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
        var aligntop       = this.$items.eq(index).offset().top;
        var alignleft      = 0;
        var dropdownwidth  = 0;
        var dropdownheight = 0;
        var liwidth        = 0;
        var liheight       = 0;
        var offset         = 0;

        if (this.options.position === 'bottom') {
            aligntop += this.$items.eq(index).outerHeight(!0) + parseInt(this.$dropdown[index].css('margin-top')) + this.options.offset;
            if (this.options.alignment === 'left') {
                alignleft =  this.$items.eq(index).offset().left;
            }
            if (this.options.alignment === 'center') {
                dropdownwidth = this.$dropdown[index].outerWidth();
                liwidth       = this.$items.eq(index).outerWidth();
                offset        = (liwidth - dropdownwidth) / 2;
                alignleft     = this.$items.eq(index).offset().left + offset;
            }
            if (this.options.alignment === 'right') {
                dropdownwidth = this.$dropdown[index].outerWidth();
                liwidth       = this.$items.eq(index).outerWidth();
                offset        = liwidth - dropdownwidth;
                alignleft     = this.$items.eq(index).offset().left + offset;
            }
        }

        if (this.options.position === 'left') {
            alignleft = this.$items.eq(index).offset().left - parseInt(this.$dropdown[index].css('margin-right')) - this.$dropdown[index].outerWidth() - this.options.offset;
            aligntop  = this.$items.eq(index).offset().top;
            if (this.options.alignment === 'top') {
                aligntop += parseInt(this.$dropdown[index].css('margin-top'));
            }
            if (this.options.alignment === 'center') {
                dropdownheight = this.$dropdown[index].outerHeight(!0);
                liheight       = this.$items.eq(index).outerHeight(!0);
                offset         = (liheight - dropdownheight) / 2;
                aligntop      += offset;
            }
            if (this.options.alignment === 'bottom') {
                dropdownheight = this.$dropdown[index].outerHeight(!0);
                liheight       = this.$items.eq(index).outerHeight(!0);
                offset         = (liheight - dropdownheight);
                aligntop      += offset;
            }
        }

        if (this.options.position === 'top') {
            aligntop -= this.$menu.outerHeight(!0) + parseInt(this.$dropdown[index].css('margin-bottom')) + this.options.offset;
            if (this.options.alignment === 'left') {
                alignleft =  this.$items.eq(index).offset().left;
            }
            if (this.options.alignment === 'center') {
                dropdownwidth = this.$dropdown[index].outerWidth();
                liwidth       = this.$items.eq(index).outerWidth();
                offset        = (liwidth - dropdownwidth) / 2;
                alignleft     = this.$items.eq(index).offset().left + offset;
            }
            if (this.options.alignment === 'right') {
                dropdownwidth = this.$dropdown[index].outerWidth();
                liwidth       = this.$items.eq(index).outerWidth();
                offset        = liwidth - dropdownwidth;
                alignleft     = this.$items.eq(index).offset().left + offset;
            }
        }

        if (this.options.position === 'right') {
            alignleft = this.$items.eq(index).offset().left + this.$items.eq(index).outerWidth() + parseInt(this.$dropdown[index].css('margin-left')) + this.options.offset;
            aligntop  = this.$items.eq(index).offset().top;
            if (this.options.alignment === 'top') {
                aligntop += parseInt(this.$dropdown[index].css('margin-top'));
            }
            if (this.options.alignment === 'center') {
                dropdownheight = this.$dropdown[index].outerHeight(!0);
                liheight       = this.$items.eq(index).outerHeight(!0);
                offset         = (liheight - dropdownheight) / 2;
                aligntop      += offset;
            }
            if (this.options.alignment === 'bottom') {
                dropdownheight = this.$dropdown[index].outerHeight(!0);
                liheight       = this.$items.eq(index).outerHeight(!0);
                offset         = (liheight - dropdownheight);
                aligntop      += offset;
            }
        }

        return {
            top: aligntop,
            left: alignleft
        };
    };

    Dropdown.prototype._calculateSubOffset = function(index, idx) {
        var aligntop  = this.$dropdown[index].children('li').eq(idx).offset().top + parseInt(this.$subdrop[index][idx].css('margin-top'));
        var alignleft  = 0;
        var liwidth    = this.$dropdown[index].outerWidth();
        var ulwidth    = this.$subdrop[index][idx].outerWidth();
        var canGoRight = ((this.$dropdown[index].offset().left + liwidth + ulwidth) < $(window).width());
        var canGoLeft  = (this.$dropdown[index].offset().left > ulwidth);
        var canGoTop   = (this.$dropdown[index].offset().top > this.$subdrop[index][idx].outerHeight());

        if (canGoRight) {
            alignleft = this.$dropdown[index].offset().left + liwidth + parseInt(this.$subdrop[index][idx].css('margin-left')) + this.options.offset;
            this.$subdrop[index][idx].addClass('grid-dropdown-position-right');
        }
        else if (canGoLeft) {
            alignleft = this.$dropdown[index].offset().left - ulwidth - parseInt(this.$subdrop[index][idx].css('margin-right')) - this.options.offset;
            this.$subdrop[index][idx].addClass('grid-dropdown-position-left');
        }
        else {
            alignleft = this.$dropdown[index].offset().left;
            if (this.options.position === 'top' && canGoTop) {
                aligntop = this.$dropdown[index].offset().top - this.$dropdown[index].outerHeight(!0) - parseInt(this.$subdrop[index][idx].css('margin-bottom')) - this.options.offset;
                this.$subdrop[index][idx].addClass('grid-dropdown-position-top');
            }
            else {
                aligntop = this.$dropdown[index].offset().top + this.$dropdown[index].outerHeight(!0) + parseInt(this.$subdrop[index][idx].css('margin-top')) + this.options.offset;
                this.$subdrop[index][idx].addClass('grid-dropdown-position-bottom');
            }
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

        if (typeof args[0] === 'object') {
            var options  = args[0];
            var params   = $.extend({}, Dropdown.DEFAULTS, options);
            if ($('body').find(params.element || this).length < 1) {
                return;
            }

            return $(params.element || this).each(function () {
                $(this).data('grid.dropdown', (data = new Dropdown(this, params)));
            });
        }
        else if (typeof args[0] === 'string') {
            data && data[args[0]]((!(typeof args[1] === 'undefined')) ? args[1] : void 0);
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

} (jQuery);
