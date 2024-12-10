# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# Create Projects


# Create Employees
employees = Employee.all

# Create Tasks
projects = Project.all # Assuming projects are already seeded

Task.create!([
  { title: "Design Homepage", description: "Create a responsive homepage", due_date: Date.today + 10, status: "Pending", project: projects.first, employee: employees.first },
  { title: "API Integration", description: "Integrate backend APIs", due_date: Date.today + 20, status: "In Progress", project: projects.first, employee: employees.last }
])
