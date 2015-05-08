# If you do not have OpenSSL installed, update
# the following line to use "http://" instead
source 'https://rubygems.org'

ruby '2.2.2'

gem 'rack'
gem 'rake'

gem "middleman", "~>3.3.12"
gem "middleman-deploy"
gem "middleman-autoprefixer"
gem "middleman-sprockets", '>= 3.3.10'
gem "middleman-livereload", group: :development

gem 'slim', '>= 2.0'
gem 'bootstrap-sass'

# for faster file watcher updates on windows:
gem "wdm", "~> 0.1.0", :platforms => [:mswin, :mingw]

# windows does not come with time zone data
gem "tzinfo-data", platforms: [:mswin, :mingw]

group :production do
  gem 'shelly-dependencies'
  gem 'thin'
end
