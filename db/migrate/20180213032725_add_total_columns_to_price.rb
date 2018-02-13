class AddTotalColumnsToPrice < ActiveRecord::Migration[5.1]
  def change
    add_column :prices, :current, :decimal, :precision => 8, :scale => 2
    add_column :prices, :listing, :decimal, :precision => 8, :scale => 2
    add_column :prices, :event_id, :integer
  end
end
