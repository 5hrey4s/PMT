class Employee < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :projects, through: :tasks # Employees are associated with projects via tasks
end
