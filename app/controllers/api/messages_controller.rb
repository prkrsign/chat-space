class Api::MessagesController < ApplicationController
    def index
        @messages = Message.all
        # ここから追記
        respond_to do |format| 
          format.html # html形式でアクセスがあった場合は特に何もなし(@messages = Message.allして終わり）
          format.json { @new_message = Message.where('id > ?', params[:message][:id]) } # json形式    
    end
end