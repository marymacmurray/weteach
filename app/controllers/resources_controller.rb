class ResourcesController < ApplicationController
  before_action :set_resource, only: [:show, :update, :destroy]
  # before_action :authorize_request, only: [:create, :update, :destroy, :add_category]
  
  # GET /resources
  def index
    @resources = Resource.all

    render json: @resources
  end

  # GET /resources/1
  def show
    render json: @resource
  end



  # POST /resources
  def create
    @resource = Resource.new(resource_params)

    if @resource.save
      render json: @resource, status: :created, location: @resource
    else
      render json: @resource.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /resources/1
  def update
    if @resource.update(resource_params)
      render json: @resource
    else
      render json: @resource.errors, status: :unprocessable_entity
    end
  end

  # DELETE /resources/1
  def destroy
    @resource.destroy
  end

  def add_category
    @category = Category.find(params[:category_id])
    @resource.categories << @category
    render json: @resource, include: :categories
  end

  def users_resources
    @resources = Resource.where(user_id:params[:user_id])
    render json: @resources, include: :categories
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_resource
      @resource = Resource.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.

    def resource_params
      params.require(:resource).permit(:user_id, :link, :description, :name)
    end
end
