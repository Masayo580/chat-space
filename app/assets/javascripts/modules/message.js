$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main__center__chatcontents" data-message-id=${message.id}>
          <div class="main__center__chatcontents__content__info ">
            <div class="main__center__chatcontents__content__info__user">
              ${message.user_name}
            </div>
            <div class="main__center__chatcontents__content__info__day">
              ${message.created_at}
            </div>
          </div>
          <div class="main__center__chatcontents__content__message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="main__center__chatcontents" data-message-id=${message.id}>
        <div class="main__center__chatcontents__content__info ">
          <div class="main__center__chatcontents__content__info__user">
            ${message.user_name}
          </div>
          <div class="main__center__chatcontents__content__info__day">
            ${message.created_at}
          </div>
        </div>
        <div class="main__center__chatcontents__content__message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.main__footer__input').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main__center').append(html);
      $('.main__center').animate({ scrollTop: $('.main__center')[0].scrollHeight});
      $('.main__footer__form-button').prop('disabled', false);      
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.main__footer__form-button').prop("disabled", false);
    });
  });  
});