(function($){

    $(function(){

        $.grid.init({
            breakPoints: {
                mobile: 480,
                tablet: 1024
            }
        });

        $.grid.menu.toggle({
            breakPoint: 480
        });

        $.grid.panel({
            wrapper: ".panels"
        });

        $.grid.scrollTo({
            scroller: ".scrollTo",
            speed: 2000
        });

    })

})(jQuery);