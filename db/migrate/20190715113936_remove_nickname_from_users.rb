class RemoveNicknameFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :nickname, :string
  end
end
