Rails.application.routes.draw do
  devise_for :users
  root 'events#index'

  resources :events
  get :get_events, to: 'events#get_events'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
