class Category < ApplicationRecord
  has_and_belongs_to_many :resources
  validates :name, presence: true
end
