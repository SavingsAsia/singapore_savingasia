require "roda"

class App < Roda
  route do |r|
    r.root do
      view("en/index")
    end
  end
end
