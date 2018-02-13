module ApplicationHelper

  def dig_hash(h, p)
    return nil unless h && (h.is_a?(Hash) || h.is_a?(ActionDispatch::Request::Session))
    return h unless p 
    p = [p] unless p.is_a?(Enumerable)
    ptr = h
    p.each do |index|
      return unless (ptr.is_a?(Hash) || ptr.is_a?(ActionDispatch::Request::Session))
      if ptr.key?(index)
        ptr = ptr[index]
      elsif index.is_a?(Symbol) && ptr.key?(index.to_s)
        ptr = ptr[index.to_s]
      else
        return nil
      end
    end
    ptr
  end
end
