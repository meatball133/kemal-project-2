class Api::Solution::Update < ApiAction
  put "/api/update/:solution_id" do
    data = params.from_json["mentor"]
    query = SolutionQuery.find(solution_id)
    SaveSolution.update!(query, mentor_note: data.to_s)
    json({status: "good"})
  end
end
