class PlayersController < ApplicationController
  def index
    @players = Player.order(:time_taken).limit(5)

    respond_to do |format|
      format.json { render :json => @players }
    end
  end

  def create
    @player = Player.create(name: params[:name], time_taken: params[:time])

    respond_to do |format|
      format.json { render :json => @player }
    end
  end
end
