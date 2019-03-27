class DropEmployeesTable < ActiveRecord::Migration[5.2]
  def up
    drop_table :employees
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end