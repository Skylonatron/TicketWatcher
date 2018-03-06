module TwitchApi

  def get_games(name)
    uri = URI.parse("https://api.twitch.tv/helix/games/top")

    # params = {
    #            name: name
    #          }

    # uri.query = URI.encode_www_form(params)

    http = Net::HTTP.new(uri.host, uri.port)

    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri)
    request['Client-ID'] = client_id

    res = http.request(request)

    JSON.parse res.body

  end

  def get_access_token
    uri = URI.parse("https://api.twitch.tv/kraken/oauth2/token")

    params = {
               client_id: client_id,
               client_secret: client_secret,
               grant_type: "client_credentials"
             }

    uri.query = URI.encode_www_form(params)

    http = Net::HTTP.new(uri.host, uri.port)

    puts uri.request_uri

    http.use_ssl = true
    request = Net::HTTP::Post.new(uri.request_uri)
    res = http.request(request)

    JSON.parse(res.body)['access_token']
  end

  def client_id
    "rqo0m765o7jkiqaxf0di3gue9fwbre"
  end

  def client_secret
    "obwrmc4wawvgfyc4rvzyl0krec1m0i"
  end

end