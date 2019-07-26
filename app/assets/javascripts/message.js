$(document).on('turbolinks:load', function(){
    function buildHTML(message) {
      var content = message.content ? `${ message.content }` : "";
      var img  = message.image ? `<img src= "${ message.image }">` : "";
      var html = `<div class="message" data-id="${message.id}">
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
                        <p class ="lower-info__image">
                            ${img}
                        </p>
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
        $('#message_content').val('');
        $('.form__submit').attr('disabled', false);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $("input[type='file']").val("");
        return false

      })
      .fail(function(data){
        alert('エラーが発生したためメッセージは送信できませんでした。');
        $('.form__submit').attr('disabled', false);
      })
    })
  });