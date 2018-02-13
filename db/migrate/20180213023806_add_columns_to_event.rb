class AddColumnsToEvent < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :event_id, :integer
    add_column :events, :metadata, :text
  end
end
