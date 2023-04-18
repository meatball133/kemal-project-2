class API::JSON::Show < ApiAction
  get "/api/solutions/:page" do
    query = SolutionQuery.new
    i = 0
    page_number = page.to_i - 1
    solutions = Array(Array(String | Int32 | Time | Int64)).new
    query.each do |solution|
      if (((page_number) * 12)...(((page_number) * 12) + 12)).includes?(i)
        solutions << [solution.un_normlized_solution, solution.occurrence, solution.mentor_note, solution.updated_at, solution.id]
      end
      i += 1
      break if i >= (page_number * 12) + 12
    end

    json({solution: solutions})
  end
end
