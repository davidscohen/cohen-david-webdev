$( document ).ready(function() {

    $('input[type=file]').on("change", function() {

        var $file = $(this).get(0).files;

        var settings = {
            async: false,
            crossDomain: true,
            processData: false,
            contentType: false,
            type: 'POST',
            url: 'https://api.imgur.com/3/image',
            headers: {
                Authorization: 'Client-ID 52cdc8fa9b3f602',
                Accept: 'application/json'
            },
            mimeType: 'multipart/form-data'
        };

        var formData = new FormData();
        formData.append("image", $file[0]);
        settings.data = formData;

        $.ajax(settings).done(function(response) {
            console.log(response);
            var display = JSON.parse(response);
            var photo = display.data.link;
            document.getElementById("message").innerHTML = "<br><img src='" + display.data.link + "'</span>" +
                "<br>URL : " + display.data.link  +
                "<br>Width : " + display.data.width + " , Height : " + display.data.height +
                "<br>Type : "  + display.data.type + "</br>";
        });

    });

});

