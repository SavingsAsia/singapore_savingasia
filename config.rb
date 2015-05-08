require 'slim'
require 'bootstrap-sass'

activate :autoprefixer

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

configure :build do
   activate :minify_css
   activate :minify_javascript
   activate :asset_hash
   activate :relative_assets
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.method = :git
  deploy.strategy = :force_push
end
