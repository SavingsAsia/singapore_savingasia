require_relative "../app"
require "rack/test"

module TestApp
  def self.included(base)
    base.instance_eval do
      include Rack::Test::Methods
    end
  end

  def app
    App
  end
end

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
end
