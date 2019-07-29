Rails.application.routes.draw do
  devise_for :users
  root to:  "groups#index"
  resources :users  , only:[:index,:edit,:update,:show]
  resources :groups , only:[:edit,:new,:create,:update] do
    resources :messages , only: [:index , :create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
