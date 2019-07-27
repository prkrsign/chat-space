class UsersController < ApplicationController

    def index
    end

    def update
        if current_user.update(user_params)
            redirect_to root_path , notice: "アカウント情報を編集しました"
        else
            render :edit
        end
    end

    def edit
    end

    def search
        @users = User.where('name LIKE(?)', "%#{params[:keyword]}%") #paramsとして送られてきたkeyword（入力された語句）で、Userモデルのnameカラムを検索し、その結果を@usersに代入する
        respond_to do |format| 
            format.html {redirect_to "users_path"}
            format.json {render 'index', json: @users}
            # format.json { render 'index', json: @users } #json形式のデータを受け取ったら、@usersをデータとして返す そしてindexをrenderで表示する
        end
    end

    private
    def user_params
        params.require(:user).permit(:name , :email)
    end
    
end
