class CharactersController < ApplicationController
  def find
    @character = Character.where("x IN (?)", (params[:x] - 5)..(params[:x] + 5))
                          .where("y IN (?)", (params[:y] - 5)..(params[:y] + 5))
    
    respond_to do |format|
      format.json { render :json => @character }
    end
  end
end
