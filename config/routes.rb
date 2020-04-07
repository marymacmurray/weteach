Rails.application.routes.draw do
  

  resources :resources
  resources :categories
  # ============== Auth routes =====================
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  resources :users
  
end
