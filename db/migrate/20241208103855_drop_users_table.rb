class DropUsersTable < ActiveRecord::Migration[6.0]
  def up
    drop_table :users, if_exists: true
  end

  def down
    create_table :users do |t|
      t.string :email, null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.timestamps null: false
    end
  end
end
