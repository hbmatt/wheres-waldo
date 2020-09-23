Rails.application.routes.draw do
  root 'pages#homepage'
  post 'characters/find'
  post 'players/create'
  get 'players/index'
end
