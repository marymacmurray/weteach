Rails.application.routes.draw do
  resources :resources
  resources :categories
  get '/categories/:category_id/resources/:id', to: 'resources#add_category'
  get '/categories', to: 'categories#index'
  get '/categories/:id', to: 'categories#show'
  get '/users/:user_id/resources', to: 'resources#users_resources'

  # ============== Auth routes =====================
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  resources :users
  
end
