module StubhubApi

  require 'net/http'
  require 'uri'
  require 'json'
  require 'base64'



  def get_list_of_events(name)
    uri = URI.parse("https://api.stubhub.com/search/catalog/events/v3")

    params = {
               name: name
             }

    uri.query = URI.encode_www_form(params)

    http = Net::HTTP.new(uri.host, uri.port)

    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = "Bearer #{application_token}"

    res = http.request(request)

    JSON.parse res.body

  end

  def get_lowest_price(eventid)
    uri = URI.parse("https://api.stubhub.com/search/inventory/v2")
    params = { eventid: eventid, sort: "currentprice asc" }
    uri.query = URI.encode_www_form(params)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = "Bearer #{application_token}"
    res = http.request(request)

    response = JSON.parse res.body

    listing = response["listing"][0]

    return { current_price: listing["currentPrice"]["amount"], listing_price: listing["listingPrice"]["amount"] }

  end

  def auth_token
    Base64.strict_encode64(consumer_key + ":" + consumer_secret)
  end

  def application_token
    "bf6f08f2-ea3d-3c48-8b8b-0b1a01ee0c78"
  end

  def consumer_key
    "sp7BO6Pvo6a26hQy4_rHumh3r9Aa"
  end

  def consumer_secret
    "ZVgQ4NY7elPuz_phA4SC7_zw1HQa"
  end
end