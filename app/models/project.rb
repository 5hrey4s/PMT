class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :employees, through: :tasks # Projects are associated with employees via tasks
end
