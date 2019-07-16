class UsersController < ApplicationController

    def update
        if current_user.update(user_params)
            redirect_to root_path , notice: "アカウント情報を編集しました"
        else
            render :edit
        end
    end

    def edit
    end

    private
    def user_params
        params.require(:user).permit(:name , :email)
    end
    
end
