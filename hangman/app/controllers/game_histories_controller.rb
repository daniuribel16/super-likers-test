class GameHistoriesController < ApplicationController

  # GET /game_histories/1
  def show
    @game_histories = GameHistory.where(user: params[:id]).order_by(date: :desc)
    render json: @game_histories
  end

  # POST /game_histories
  def create
    @game_history = GameHistory.new(game_history_params)

    if @game_history.save
      render json: @game_history, status: :created, location: @game_history
    else
      render json: @game_history.errors, status: :unprocessable_entity
    end
  end

  private

    def game_history_params
      params.require(:game_history).permit(:user, :date, :won)
    end
end
