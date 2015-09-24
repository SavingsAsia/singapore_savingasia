require "rake"
require "ragnarson/rake_task"

namespace :assets do
  desc "Precompile the assets"
  task :precompile do
    require './app'
    App.compile_assets
  end
end
