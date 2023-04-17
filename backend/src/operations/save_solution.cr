class SaveSolution < Solution::SaveOperation
  permit_columns un_normlized_solution, normlized_solution, mentor_note
  upsert_lookup_columns :normlized_solution
end
