class API::JSON::Show < ApiAction
  get "/api/solutions" do
    query = SolutionQuery.new
    i = 0
    solutions = Array(Array(String | Int32 | Time | Int64)).new
    query.each do |solution|
      solutions << [solution.un_normlized_solution, solution.occurrence, solution.mentor_note, solution.updated_at, solution.id]
      break if i == 10
      i += 1
    end

    json({solution: solutions})
  end
end
