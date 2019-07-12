require 'bcrypt'

class UsersController < ApplicationController

  # POST /users
  def create
    @user = User.where(email: params[:email]).first
    if !@user
      @user = User.new(user_params)
      @user.password = BCrypt::Password.create(params[:password])

      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else 
      render json: { error: 'Email existente' }
    end
  end

  def login
    @user = User.where(email: params[:email]).first

    if @user
      if BCrypt::Password.new(@user.password) == params[:password]
        render json: { success: true }
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end

  private

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :last_name, :email, :password, :phone)
    end
end
