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
    js: %w(all.js google.analitics.js jquery.lazy-load-google-maps.min.js jquery.mobile.custom.min.js )

  route do |r|
    r.assets
    r.root do
      r.redirect "https://getmii.com"
    end

    r.on "en" do
      r.get do
        view("en/index")
      end
    end
  end
end
