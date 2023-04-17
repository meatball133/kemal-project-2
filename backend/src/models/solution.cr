class Solution < BaseModel
#skip_schema_enforcer
  table do
    column normlized_solution : String
    column un_normlized_solution : String
    column mentor_note : String = "none"
    column occurrence : Int32 = 1
  end
end
