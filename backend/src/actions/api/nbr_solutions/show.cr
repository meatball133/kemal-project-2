class Api::NbrSolutions::Show < ApiAction
  get "/api/nbr_solutions/" do
    json({amount: SolutionQuery.new.select_count})
  end
end
