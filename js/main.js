(function($){

    $(function(){
        var $window = $(window),
            $body   = $('body'),
            $header = $('#menu-header'),
            $banner = $('#header-wrapper');

            $.grid.init({
                breakPoints: {
                    mobile: 480,
                    tablet: 1024
                }
            });
        
            $.grid.menu.dropdown({
                animation: 'fade'
            });
            
            $.grid.menu.toggle({
                breakPoint: 1024,
                animation: 'push-left'
            });

            $.grid.scroll({
                element: '#header-wrapper',
                anchor: 'top',
                onEnter: function() { $header.attr('class', 'alt'); },
                onExit: function() { $header.attr('class', 'reveal'); }
            });

    });

})(jQuery);