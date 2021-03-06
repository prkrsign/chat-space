$(document).on('turbolinks:load', function(){
    function buildHTML(message) {
      var content = message.content ? `${ message.content }` : "";
      var img  = message.image ? `<img class="lower-info__image" src="${ message.image }">` : "";
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-info">
                      <p class="upper-info__user">
                        ${message.user_name}
                      </p>
                      <p class="upper-info__date">
                        ${message.date}
                      </p>
                    </div>
                      <div class="lower-info">
                        <p class="lower-info__content">
                            ${content}
                        </p>
                            ${img}
                      </div>
                  </div>`
    return html;
    }

      $('#new_message').on('submit', function(e){
        e.preventDefault();
        var message = new FormData(this);
        var url = $(this).attr('action')
        $.ajax({  
          url: url,
          type: 'POST',
          data: message,
          dataType: 'json',
          processData: false,
          contentType: false
        })

        .done(function(data){
          var html = buildHTML(data);
          $('.messages').append(html);
          $('.form__submit').attr('disabled', false);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          $('#new_message')[0].reset();
          return false
        })
        .fail(function(data){
          alert('エラーが発生したためメッセージは送信できませんでした。');
          $('.form__submit').attr('disabled', false);
        })
      })

      // ここから自動更新機能
      var reloadMessages = function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){    // group/:group_id/messagesというURLの時だけ、以降の記述が実行されます。
      var href = 'api/messages#index {:format=>"json"}'              // リクエスト先と形式を指定しています。
      var last_message_id = $('.message:last').data('message-id');   // カスタムデータ属性を利用して、最新のメッセージIDを取得しています。
      
      // ajaxの形式をそれぞれ指定しています。
      $.ajax({
        url:  href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      

      .done(function(messages){        // フォームに入力されたデータを引数として取得しています。
        var insertHTML='';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          });
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      });
    };
  };
  setInterval(reloadMessages, 5000);
});