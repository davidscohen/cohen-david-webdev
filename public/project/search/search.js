$( document ).ready(function() {

    $('#input').on('click', function() {

        var search = $('#search').val();

        var url = "https://api.imgur.com/3/gallery/search/?q=" + search;

        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                Authorization: 'Client-ID 52cdc8fa9b3f602'
            }
        })

            .done(function (response) {
                console.log(response);
                for(i = 1; i <= 50; i++) {
                    document.getElementById("message").innerHTML += "<br><a href='" + response.data[i].link + "'>'" + response.data[i].title + "'</a>";
                }

            });
    });
});