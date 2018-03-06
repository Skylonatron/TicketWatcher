class Event < ApplicationRecord
  include StubhubApi

  has_many :prices, dependent: :destroy

  def metadata_hash
    JSON.parse(metadata)
  end

  # write a test for this
  # price from api
  def get_price
    get_lowest_price(event_id)
  end

  # test
  def get_most_recent_price
    self.prices.order("created_at desc").first
  end

  # test
  def new_price(price)
    return nil unless price

    current_price = self.get_most_recent_price
    if current_price&.current == price[:current_price]
      current_price.update(updated_at: Time.current)
    else
      self.prices << Price.create(current: price[:current_price], listing: price[:listing_price])
    end
  end

  def graph_prices
    @graph_prices = self.prices.order('created_at desc').flat_map do |p|
      [[p.created_at, p.current],
      [p.updated_at, p.current]]
    end.to_h

    return @graph_prices
  end


end
