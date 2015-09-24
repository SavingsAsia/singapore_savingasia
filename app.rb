require "roda"
require "slim"

class App < Roda
  plugin :render, engine: "slim"
  plugin :static, ["/assets"]
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

  DEFAULT_LANGUAGE = "en".freeze
  TRANSLATIONS = %w(en th).freeze


  route do |r|
    r.assets
    r.root do
      r.redirect "/#{DEFAULT_LANGUAGE}", response.status = 301
    end

    r.is  :lang  do |lang|
      r.get do
        return view(404) unless TRANSLATIONS.include?(lang)
        view("index", locals: { lang: lang })
      end
    end
  end
end



# return view(404) unless TRANSLATIONS.include?(lang)
# view("index", locals: { lang: lang })
