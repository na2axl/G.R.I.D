(function($){
    
    var $window   = $(window),
        $document = $(document),
        $body     = $('body');
    
    $(function(){

        $.grid.init({
            breakPoints: {
                mobile: 480,
                tablet: 1024
            }
        });

        $.grid.panel({
            wrapper: ".panels"
        });
        
        $("#go-to-site").click(function(e){
            e.preventDefault();
            $("#step-alerts-wrapper").fadeOut(500);
            $.grid.progress({
                bar: "#overall-progress",
                width: "33.33333333333333%",
                color: "#c00",
                onFinish: function() {
                    $.grid.alert({
                        container: "#progress-alert-wrapper",
                        text: "Don't abort the setup now !! Otherwise your site will not work.",
                        type: "warning",
                        anim: "fade",
                        speed: 500,
                        cleanBefore: true,
                        hideAfter: false
                    });
                }
            });
        });
        
        $("#go-to-account").click(function(e){
            e.preventDefault();
            $("#step-alerts-wrapper").fadeOut(500);
            $.grid.progress({
                bar: "#overall-progress",
                width: "66.66666666666667%",
                color: "#ec971f",
                onFinish: function() {
                    $.grid.alert({
                        container: "#progress-alert-wrapper",
                        text: "CMS is fully installed ! But before you use the site, you have to create an admin account.",
                        type: "middle-install info",
                        anim: "fade",
                        speed: 500,
                        cleanBefore: true,
                        hideAfter: false
                    });
                }
            });
        });

        $("#go-to-finish").click(function(e){
            e.preventDefault();
            $("#step-alerts-wrapper").fadeOut(500);
            $.grid.progress({
                bar: "#overall-progress",
                width: "100%",
                color: "#060",
                onFinish: function() {
                    $.grid.alert({
                        container: "#progress-alert-wrapper",
                        text: "You installed and configured CMS with success ! You are now able to use your site !",
                        type: "success",
                        anim: "fade",
                        speed: 500,
                        cleanBefore: true,
                        hideAfter: false
                    });
                }
            });
        });

        $("#go-to-home").click(function(e){
            e.preventDefault();
            $.grid.alert({
                container: "#step-alerts-wrapper",
                text: "Hey !! What did you expect ? This was just a demo !",
                type: "info",
                anim: "fade",
                speed: 500,
                cleanBefore: true,
                withClose: true,
                hideAfter: true,
                timeOut: 5000
            });
        });
        

        var simulate_loading = function( timeOut, onFinish ) {
            $("#step-alerts-wrapper").fadeOut(500, function(){
                $.grid.alert({
                    container: "#step-loader-wrapper",
                    text: "Please wait for a while, this will not take more than a minute !",
                    type: "loading",
                    anim: "fade",
                    speed: 500,
                    cleanBefore: true,
                    hideAfter: false,
                    onOpen: function() { setTimeout(function(){
                        $("#step-loader-wrapper").fadeOut(500, function() { 
                            $.grid.alert({
                                container: "#step-alerts-wrapper",
                                text: "The operation was successful ! You can continue now...",
                                type: "success",
                                anim: "shake-vertical",
                                intensity: "10px",
                                speed: 100,
                                cleanBefore: true,
                                withClose: true,
                                hideAfter: false,
                                onOpen: function() { if(onFinish){ onFinish() } }
                            });
                        });
                    }, timeOut) }
                });
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
                $.grid.shakeIt({
                    element: "#database-config-form",
                    speed: 100,
                    onFinish: function() {
                        $.grid.alert({
                            container: "#step-alerts-wrapper",
                            text: "Nope !! You have to insert all required informations to connect properly to the database.",
                            type: "warning",
                            anim: "fade",
                            speed: 500,
                            cleanBefore: true,
                            withClose: true,
                            hideAfter: false
                        });
                    }
                });
            }
            else {
                simulate_loading(5000, function(){
                    $("#database-config-form").find('input').filter('[type="submit"]').fadeOut(500, function(){
                        $("#database-config-form").find('input').filter('[type="text"]').attr('disabled', 'disabled'); $("#go-to-site").fadeIn(500);
                    });
                });
            }
            
        });
        
        $("#site-config-form").submit(function(e){
            e.preventDefault();
            
            var if_invalid_field = check_fields_of("#site-config-form");
            
            if (if_invalid_field) {
                $.grid.shakeIt({
                    element: "#site-config-form",
                    speed: 100,
                    onFinish: function() {
                        $.grid.alert({
                            container: "#step-alerts-wrapper",
                            text: "Nope !! You have to insert all required informations to setup your site.",
                            type: "warning",
                            anim: "fade",
                            speed: 500,
                            cleanBefore: true,
                            withClose: true,
                            hideAfter: false
                        });
                    }
                });
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
                $.grid.shakeIt({
                    element: "#account-config-form",
                    speed: 100,
                    onFinish: function() {
                        $.grid.alert({
                            container: "#step-alerts-wrapper",
                            text: "Nope !! You have to insert all required informations to create an admin account for your site.",
                            type: "warning",
                            anim: "fade",
                            speed: 500,
                            cleanBefore: true,
                            withClose: true,
                            hideAfter: false
                        });
                    }
                });
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