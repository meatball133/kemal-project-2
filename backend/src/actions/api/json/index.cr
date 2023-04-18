class Api::JSON::Index < ApiAction
  include Api::Auth::SkipRequireAuthToken
  post "/api" do
    data = params.from_json["solution"]
    normlized_solution = Api::JSON::Representer.start(data.to_s)
    if normlized_solution.to_s != data.to_s # Check that the the file were able to be normlized
      query = SolutionQuery.new             # Get query from the solution data base
      occurrence = nil
      mentor_note = nil
      query.each do |solution|                               # Iterate over each element in the database
        if solution.normlized_solution == normlized_solution # If the solution already exisist incremeant the occurance
          occurrence = solution.occurrence + 1
          unless solution.mentor_note == "none"
            mentor_note = solution.mentor_note # Get the mentor notes if they exsist
          end
          solution = SaveSolution.upsert!(normlized_solution: normlized_solution, occurrence: occurrence) # Update the occurence
        end
      end
      if mentor_note.nil? # Make sure that mentor note isn't nil
        mentor_note = ""
      end
      if occurrence.nil? # If occurrence is nil then add the solution to the database
        occurrence = 1
        solution = SaveSolution.upsert!(normlized_solution: normlized_solution, un_normlized_solution: data.to_s, mentor_note: "none")
      end
      json({solution: Api::JSON::Representer.start(data.to_s), occurrence: occurrence, mentor_note: mentor_note}) # Return the solution, occurrence and mentor notes
    else
      json({status: "fail"}) # Return fail if the solution is not valid
    end
  end
end
