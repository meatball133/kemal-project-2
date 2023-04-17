class API::Solution::Show < ApiAction
  get "/api/solution/:solution_id" do
    query = SolutionQuery.find(solution_id)
    solution = [query.un_normlized_solution, query.occurrence, query.mentor_note, query.updated_at]
    json({solution: solution})
  end
end
