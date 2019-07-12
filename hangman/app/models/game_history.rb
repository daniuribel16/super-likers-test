class GameHistory
  include Mongoid::Document
  field :user, type: String
  field :date, type: DateTime
  field :won, type: Mongoid::Boolean
end
