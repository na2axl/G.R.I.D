(function($){

    var $window   = $(window),
        $document = $(document),
        $body     = $('body');

    $(function(){

        GRID.init();

        $.grid.panels({
            wrapper: ".panels"
        });

        // Instanciate the Alert plugin on these elements
        $("#step-alerts-wrapper").alert();
        $("#progress-alert-wrapper").alert();
        $.grid.alert({
            container: "#step-loader-wrapper",
            type: "loading",
            anim: "fade",
            speed: 500,
            cleanBefore: true,
            hideAfter: true
        });

        // Get the Alert plugin instances
        var Alert_messages = $("#step-alerts-wrapper").data('grid.alert');
        var Alert_progress = $("#progress-alert-wrapper").data('grid.alert');
        var Alert_loading  = $("#step-loader-wrapper").data('grid.alert');

        // Instanciate the Progess plugin on this element
        $('#overall-progress').progress();

        // Get the Progress plugin instance
        var Progress = $('#overall-progress').data('grid.progress');

        // Instanciate the ShakeIt plugin on these elements
        $("#database-config-form").shakeIt();
        $("#site-config-form").shakeIt();
        $("#account-config-form").shakeIt();

        // Get the ShakeIt plugin instances
        var ShakeIt_database = $("#database-config-form").data('grid.shakeIt');
        var ShakeIt_site     = $("#site-config-form").data('grid.shakeIt');
        var ShakeIt_account  = $("#account-config-form").data('grid.shakeIt');

        $("#go-to-site").click(function(e){
            e.preventDefault();
            Alert_messages.close();
            Progress
                .set_width("33.33333333333333%")
                .set_color("#c00")
                .onFinish(function() {
                    console.log('finish');
                    Alert_progress
                        .set_text("Don't abort the setup now !! Otherwise your site will not work.")
                        .set_type("warning")
                        .set_anim("fade")
                        .set_speed(500)
                        .set_cleanBefore(true)
                        .set_hideAfter(false)
                        .show();
                })
                .animate();
        });

        $("#go-to-account").click(function(e){
            e.preventDefault();
            Alert_messages.close();
            Progress
                .set_width("66.66666666666667%")
                .set_color("#ec971f")
                .onFinish(function() {
                    Alert_progress
                        .set_text("CMS is fully installed ! But before you use the site, you have to create an admin account.")
                        .set_type("middle-install info")
                        .set_anim("fade")
                        .set_speed(500)
                        .set_cleanBefore(true)
                        .set_hideAfter(false)
                        .show();
                })
                .animate();
        });

        $("#go-to-finish").click(function(e){
            e.preventDefault();
            Alert_messages.close();
            Progress
                .set_width("100%")
                .set_color("#060")
                .onFinish(function() {
                    Alert_progress
                        .set_text("You installed and configured CMS with success ! You are now able to use your site !")
                        .set_type("success")
                        .set_anim("fade")
                        .set_speed(500)
                        .set_cleanBefore(true)
                        .set_hideAfter(false)
                        .show();
                })
                .animate();
        });

        $("#go-to-home").click(function(e){
            e.preventDefault();
            Alert_messages
                .set_text("Hey !! What did you expect ? This was just a demo !")
                .set_type("info")
                .set_anim("fade")
                .set_speed(500)
                .set_cleanBefore(true)
                .set_withClose(true)
                .set_hideAfter(true)
                .set_timeOut(5000)
                .show();
        });


        var simulate_loading = function( timeOut, onFinish ) {
            $("#step-alerts-wrapper").fadeOut(500, function(){
                Alert_loading
                    .set_text("Please wait for a while, this will not take more than a minute !")
                    .set_timeOut(timeOut)
                    .onOpen(function() {
                        setTimeout(function(){
                            Alert_messages
                                .set_type("success")
                                .set_text("The operation was successful ! You can continue now...")
                                .set_anim("shake-vertical")
                                .set_intensity("10px")
                                .set_speed(100)
                                .set_cleanBefore(true)
                                .set_withClose(true)
                                .set_hideAfter(false)
                                .onOpen(function() { onFinish && onFinish() })
                                .show();
                        }, timeOut);
                    })
                    .show();
            });
        };

        var check_fields_of = function(formID) {
            var $important_fields = $(formID).find('.important');
            var required_fields   = false,
                val               = null;

            $important_fields.each(function(){
                val = $(this).val();
                if (val == "") {
                    required_fields = true;
                }
            });

            return required_fields;
        };

        $("#database-config-form").submit(function(e){
            e.preventDefault();

            var if_invalid_field = check_fields_of("#database-config-form");

            if (if_invalid_field) {
                ShakeIt_database
                    .set_speed(100)
                    .set_intensity(20)
                    .onFinish(function() {
                        Alert_messages
                            .set_text("Nope !! You have to insert all required informations to connect properly to the database.")
                            .set_type("warning")
                            .set_anim("fade")
                            .set_speed(500)
                            .set_cleanBefore(true)
                            .set_withClose(true)
                            .set_hideAfter(false)
                            .show()
                    })
                    .shake();
            }
            else {
                simulate_loading(5000, function(){
                    $("#database-config-form").find('input').filter('[type="submit"]').fadeOut(500, function(){
                        $("#database-config-form").find('input').filter('[type="text"]').attr('disabled', 'disabled');
                        $("#go-to-site").fadeIn(500);
                    });
                });
            }

        });

        $("#site-config-form").submit(function(e){
            e.preventDefault();

            var if_invalid_field = check_fields_of("#site-config-form");

            if (if_invalid_field) {
                ShakeIt_site
                    .set_speed(100)
                    .set_intensity(20)
                    .onFinish(function() {
                        Alert_messages
                            .set_text("Nope !! You have to insert all required informations to setup your site.")
                            .set_type("warning")
                            .set_anim("fade")
                            .set_speed(500)
                            .set_cleanBefore(true)
                            .set_withClose(true)
                            .set_hideAfter(false)
                            .show()
                    })
                    .shake();
            }
            else {
                simulate_loading(1000, function(){
                    $("#site-config-form").find('input').filter('[type="submit"]').fadeOut(500, function(){
                        $("#go-to-account").fadeIn(500);
                    });
                });
            }

        });

        $("#account-config-form").submit(function(e){
            e.preventDefault();

            var if_invalid_field = check_fields_of("#account-config-form");

            if (if_invalid_field) {
                ShakeIt_account
                    .set_speed(100)
                    .set_intensity(20)
                    .onFinish(function() {
                        Alert_messages
                            .set_text("Nope !! You have to insert all required informations to create an admin account for your site.")
                            .set_type("warning")
                            .set_anim("fade")
                            .set_speed(500)
                            .set_cleanBefore(true)
                            .set_withClose(true)
                            .set_hideAfter(false)
                            .show()
                    })
                    .shake();
            }
            else {
                simulate_loading(5000, function(){
                    $("#account-config-form").find('input').filter('[type="submit"]').fadeOut(500, function(){
                        $("#account-config-form").find('input').filter('[type="text"]').attr('disabled', 'disabled'); $("#go-to-finish").fadeIn(500);
                    });
                });
            }

        });

    })

})(jQuery);