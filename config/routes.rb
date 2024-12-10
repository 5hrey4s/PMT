Rails.application.routes.draw do
  get "home/index"
  devise_for :users, path: '', path_names: { sign_up: 'sign-up' }
  resources :tasks
  resources :employees
  resources :projects
  get "hello_world", to: "hello_world#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  root "home#index" # Set the home#index action as the root path
  get "up" => "rails/health#show", as: :rails_health_check
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  devise_scope :user do
    get "/login", to: "devise/sessions#new"
  end

  # Explicitly define the sign_out route if needed
devise_scope :user do
  delete "/users/sign_out", to: "devise/sessions#destroy"
end


  get "/edit-profile", to: "devise/registrations#edit"
end
