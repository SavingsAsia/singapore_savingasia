require "roda"
require "slim"

class App < Roda
  DEFAULT_LANGUAGE = "en".freeze
  TRANSLATIONS = %w(en th).freeze

  plugin :render, engine: "slim"
  plugin :environments
  plugin :not_found
  plugin :static, ["/fonts", "/images", "/stylesheets"]
  plugin :assets,
    css: %w(all.scss),
    css_opts: { style: :compressed, cache: false },
    compiled_css_dir: "stylesheets",
    precompiled: "compiled_assets.json",
    prefix: nil,
    js: %w(
      jquery-2.1.4.min.js
      all.js
      google.analitics.js
      jquery.mobile.custom.min.js
      jquery.lazy-load-google-maps.min.js
    )

  configure :production do
    compile_assets
  end

  not_found do
    view("404")
  end

  route do |r|
    r.assets

    r.root do
      r.redirect "/#{DEFAULT_LANGUAGE}", response.status = 301
    end

    r.is ":lang" do |lang|
      r.get do
        if TRANSLATIONS.include?(lang)
          view("index", locals: { lang: lang })
        else
          r.redirect "/404", response.status = 404
        end
      end
    end
  end
end
