class CreateResources < ActiveRecord::Migration[6.0]
  def change
    create_table :resources do |t|
      t.references :user, null: false, foreign_key: true
      t.string :link
      t.string :description
      t.string :image

      t.timestamps
    end
  end
end
