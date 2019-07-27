$(document).on('turbolinks:load', function(){

    var search_list = $("#user-search-result");

    function appendUser(user){
        var html = 
                    `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${user.name}</p>
                        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                    </div>`;
                    search_list.append(html);
    }



    $('#user-search-field').on('keyup', function(e){
        var input = $("#user-search-field").val();
        console.log(input)

        $.ajax({
            type: 'GET',                // HTTPメソッドはGETで
            url:  '/users',             // /usersのURLに (これによりusersコントローラのindexアクションが起動)
            data: { keyword: input},    // keyword: inputを送信する
            dataType: 'json'            // サーバから値を返す際はjsonである
        })

        .done(function(users){                // usersにjson形式のuser変数が代入される。複数形なので配列型で入ってくる
            $('#user-search-result').empty();
            if (users.length !== 0 ){
                users.forEach(function(user){
                    console.log(user)
                    appendUser(user)
                });
            }
        });



    });
});
