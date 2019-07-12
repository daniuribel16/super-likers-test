class WordsController < ApplicationController

  # GET /words
  def index
    words = Word.all
    random_num = rand(1..words.count)
    @word = words.to_a[random_num - 1]
    render json: @word
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_word
      @word = Word.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def word_params
      params.require(:word).permit(:random_word)
    end
end
