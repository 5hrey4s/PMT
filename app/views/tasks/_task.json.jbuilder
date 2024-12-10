json.extract! task, :id, :title, :description, :due_date, :status, :project_id, :employee_id, :created_at, :updated_at
json.url task_url(task, format: :json)
