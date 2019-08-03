class Api::MessagesController < ApplicationController
    def index

        @group = Group.find(params[:group_id])
        @messages = @group.messages.includes(:user).where('id > ?', params[:id])
        
        respond_to do |format|
            format.html
            format.json
        end
    end
end
#   format.json { @new_message = Message.where('id > ?', params[:message][:id]) } # json形式   