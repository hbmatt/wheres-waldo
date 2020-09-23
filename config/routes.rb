Rails.application.routes.draw do
  root 'pages#homepage'
  post 'characters/find'
end
