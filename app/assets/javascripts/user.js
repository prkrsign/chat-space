$(document).on('turbolinks:load', function(){
    // function buildHTML(message) {
    //     var name = message.content ? `${ message.content }` : "";
    //     var img  = message.image ? `<img src= "${ message.image }">` : "";
    //     var html = `<div class="message" data-id="${message.id}">;


    $('#user-search-field').on('keyup', function(e){
        var input = $("#user-search-field").val();
        console.log(input)

        $.ajax({
            type: 'GET',                // HTTPメソッドはGETで
            url:  '/users',             // /usersのURLに (これによりusersコントローラのindexアクションが起動)
            data: { keyword: input},    // keyword: inputを送信する
            dataType: 'json'            // サーバから値を返す際はjsonである
        })

        .done(function(users){
            $('#user-search-result').empty();
            if (users.length !== 0 ){
                users.forEach(function(user){
                    console.log(user)
                })
            }
        });



    });
});
