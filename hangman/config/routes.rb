Rails.application.routes.draw do
  resources :words
  resources :game_histories
  resources :users

  post '/login', to: 'users#login'
end
