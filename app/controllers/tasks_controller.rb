class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]

  # GET /tasks or /tasks.json
  def index
    @tasks = Task.includes(:project, :employee).all
    @tasks_data = @tasks.map do |task|
    {
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
      created_at: task.created_at,
      updated_at: task.updated_at,
      project: {
        id: task.project&.id,
        name: task.project&.name
      },
      employee: {
        id: task.employee&.id,
        name: task.employee&.name
      }
    }
    end
  end
  
  
  # GET /tasks/1 or /tasks/1.json
  # TasksController
  def show
    @task = Task.includes(:project, :employee).find(params[:id])
    @task_data = {
      id: @task.id,
      title: @task.title,
      description: @task.description,
      due_date: @task.due_date,
      status: @task.status,
      created_at: @task.created_at,
      updated_at: @task.updated_at,
      project: {
        id: @task.project&.id,
        name: @task.project&.name
      },
      employee: {
        id: @task.employee&.id,
        name: @task.employee&.name
      }
    }
  end


  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html { redirect_to @task, notice: "Task was successfully created." }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to @task, notice: "Task was successfully updated." }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy!

    respond_to do |format|
      format.html { redirect_to tasks_path, status: :see_other, notice: "Task was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.expect(task: [ :title, :description, :due_date, :status, :project_id, :employee_id ])
    end
end
