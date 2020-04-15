class User < ApplicationRecord
  has_many :resources
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 8 }
  # validate :password_complexity

  def password_complexity
    # Regexp extracted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    return if password.blank? || password =~ /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!#'@%$&-])/

    errors.add :password, "Complexity requirement not met. Please use at least: 1 uppercase, 1 lowercase, 1 digit and 1 special character(!#'@%$&-)"
  end

  def frontend_data
    {
      id: id,
      username: username,
      created_at: created_at,
      updated_at: updated_at
    }
  end

end
