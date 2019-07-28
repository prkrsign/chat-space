$(document).on('turbolinks:load', function(){

    var search_list = $("#user-search-result");
    var member_list = $("#member-append");

    function appendUser(user){
        var html = 
                    `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${user.name}</p>
                        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                    </div>`;
                    search_list.append(html);
    }

    function appendErrMsgToHTML(msg){
        var html = 
                    `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${msg}</p>
                    </div>`;
                    search_list.append(html);
    }

    function addUser(user_id , user_name){
        var html =
                    `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                        <input name='group[user_ids][]' type='hidden' value=${user_id}>
                        <p class='chat-group-user__name'>${user_name}</p>
                        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                    </div>`
                    member_list.append(html);
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
            
            if (input.length === 0) {
                $('#user-search-result').empty();
              }

            else if (users.length !== 0 ){
                $('#user-search-result').empty();
                users.forEach(function(user){
                    console.log(user)
                    appendUser(user)
                });
            }

            else {
                $('#user-search-result').empty();
                appendErrMsgToHTML("一致するユーザーが見つかりません");
            }
        })

        .fail(function() {
            alert('ユーザー検索に失敗しました');
        });
    });

    $(document).on("click", ".user-search-add", function () {  
        // .on(events , [selector]) 第二引数では子要素を指定することによりイベントデリゲートできる
          var user_id = $(this).data('user-id');
          var user_name = $(this).data('user-name');
          console.log(user_id);
          console.log(user_name);
          addUser(user_id , user_name);
          $(this).parent().remove();
    });    

});
