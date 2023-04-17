class Api::JSON::Index < ApiAction
  include Api::Auth::SkipRequireAuthToken
  post "/api" do
    data = params.from_json["name"]
    normlized_solution = Api::JSON::Representer.start(data.to_s)
    if normlized_solution.to_s != data.to_s
      query = SolutionQuery.new
      occurrence = nil
      mentor_note = nil
      query.each do |solution|
        if solution.normlized_solution == normlized_solution
          occurrence = solution.occurrence + 1
          unless solution.mentor_note == "none"
            mentor_note = solution.mentor_note
          end
          solution = SaveSolution.upsert!(normlized_solution: normlized_solution, occurrence: occurrence)
        end
      end
      if mentor_note.nil?
        mentor_note = ""
      end
      if occurrence.nil?
        occurrence = 1
        solution = SaveSolution.upsert!(normlized_solution: normlized_solution, un_normlized_solution: data.to_s, mentor_note: "none")
      end
      json({solution: Api::JSON::Representer.start(data.to_s), occurrence: occurrence, mentor_note: mentor_note})
    else
      json({status: "fail"})
    end
  end
end
