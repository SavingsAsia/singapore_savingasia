require "spec_helper"

describe "app routing" do
  include TestApp

  it "returns 302 HTTP redirect status code for root path" do
    get "/"

    expect(last_response.status).to eql(301)
  end

  it "returns 200 HTTP status code for english version" do
    get "/en"

    expect(last_response.status).to eql(200)
  end

  it "returns 200 HTTP status code for thai version" do
    get "/th"

    expect(last_response.status).to eql(200)
  end

  it "returns 200 HTTP status code for 404 page" do
    get "/th"

    expect(last_response.status).to eql(200)
  end

  it "returns 301 HTTP redirect status code for unknown language" do
    get "/it"

    expect(last_response.status).to eql(301)
  end
end
