require "roda"
require "slim"

TRANSLATIONS = %w(en th).freeze

class App < Roda
  plugin :render, engine: "slim"
  plugin :static, ["/assets"]
  plugin :assets,
    css: %w(all.scss),
    css_opts: { style: :compressed, cache: false },
    compiled_css_dir: "stylesheets",
    precompiled: "compiled_assets.json",
    prefix: nil,
    js: %w(jquery-2.1.4.min.js all.js google.analitics.js jquery.mobile.custom.min.js jquery.lazy-load-google-maps.min.js )

  route do |r|
    r.assets
    r.root do
      r.redirect "/en"
    end

    r.is :id do |id|
      r.get do
        TRANSLATIONS.include?(id) ? view("#{id}/index") : view("404")
      end
    end
  end
end

