# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.destroy_all
Resource.destroy_all

User.create!(username: 'testuser1',email:"test1@gmail.com",password:"Password1!")
User.create!(username: 'testuser2',email:"test2@gmail.com",password:"Password1!")


env = Category.create!(name:"Environment")
check = Category.create!(name:"Check for Understanding")
formative = Category.create!(name:"Formative Assessment")
summative = Category.create!(name:"Summative Assessment")
groups = Category.create!(name:"Group Work")

p "#{Category.count} categories were created"

Resource.create!(name: 'Creating Zoom breakout rooms', categories: [env, groups, check], link:"https://support.zoom.us/hc/en-us/articles/360032752671-Pre-assigning-participants-to-breakout-rooms#h_36f71353-4190-48a2-b999-ca129861c1f4", description:"Use zoom breakout rooms to form het/homogenous groupings.  Check in with your groups by stopping into breakout rooms.",user_id:2)
Resource.create!(name: 'Using Google Classroom Forms for Quizzes', categories: [check, formative, summative], link:"https://youtu.be/KlV01IHAovw",description:"Add a google form to your drive and use it as a quiz.",user_id:1)
Resource.create!(name: 'Setting up your Zoom classroom', categories: [env], link:"https://youtu.be/ocTFLh46fgE",description:"Go through all the settings in zoom with the pros and cons of each in less than 23 minutes.", user_id:1)

p "#{Resource.count} resources were created"