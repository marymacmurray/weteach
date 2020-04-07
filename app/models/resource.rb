class Resource < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :categories

  validates :name, presence: true
  validates :link, presence: true
  validates :description, presence: true
end
