class ApplicationController < ActionController::Base
  before_action :set_global_variables

  private

  def set_global_variables
    @current_user = current_user # Provided by Devise or custom authentication
    @is_logged_in = @current_user.present? # Check if the user is logged in
  end
end
