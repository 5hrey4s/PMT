class HomeController < ApplicationController
  layout "application"

  def index
    # Assuming you're using Devise for authentication
    @current_user = current_user
    @is_logged_in = @current_user.present?
  end
end
