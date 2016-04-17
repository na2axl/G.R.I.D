(function($){

    $(function(){

        GRID.init();

        $.grid.menuToggle({
            menu: 'nav.menu'
        });

        $.grid.panels({
            wrapper: ".panels"
        });

        $.grid.scrollTo({
            scroller: ".scrollTo",
            speed: 2000
        });

    })

})(jQuery);