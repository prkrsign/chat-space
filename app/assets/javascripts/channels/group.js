$(document).on('turbolinks:load', function(){

    $('#user-search-field').on('keyup', function(e){
        console.log('ひょ')
        e.preventDefault();
    });
});
