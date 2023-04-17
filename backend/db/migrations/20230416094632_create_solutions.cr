class CreateSolutions::V20230416094632 < Avram::Migrator::Migration::V1
  def migrate
    # Learn about migrations at: https://luckyframework.org/guides/database/migrations
    create table_for(Solution) do
       primary_key id : Int64
      add_timestamps
      add normlized_solution : String
      add un_normlized_solution : String
      add occurrence : Int32, default: 1
      add mentor_note : String, default: "none"
    end
  end

  def rollback
    drop table_for(Solution)
  end
end

