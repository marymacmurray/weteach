# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).


Category.destroy_all
Resource.destroy_all
User.destroy_all

User.create!(username: 'testuser1',email:"test1@gmail.com",password:"Password1!")
User.create!(username: 'testuser2',email:"test2@gmail.com",password:"Password1!")

p "#{User.count} users were created"

env = Category.create!(name:"Environment")
check = Category.create!(name:"Check for Understanding")
formative = Category.create!(name:"Formative Assessment")
summative = Category.create!(name:"Summative Assessment")
groups = Category.create!(name:"Group Work")

p "#{Category.count} categories were created"

Resource.create!(name: 'Creating Zoom breakout rooms', categories: [env, groups, check], link:"https://support.zoom.us/hc/en-us/articles/360032752671-Pre-assigning-participants-to-breakout-rooms#h_36f71353-4190-48a2-b999-ca129861c1f4", description:"Use zoom breakout rooms to form het/homogenous groupings.  Check in with your groups by stopping into breakout rooms.",image:"https://i.imgur.com/rY5upGi.png",user_id:2)
Resource.create!(name: 'Using Google Classroom Forms for Quizzes', categories: [check, formative, summative], link:"https://youtu.be/KlV01IHAovw",description:"Add a google form to your drive and use it as a quiz.",image:"https://i.imgur.com/SpWcoh6.png",user_id:1)
Resource.create!(name: 'Setting up your Zoom classroom', categories: [env], link:"https://youtu.be/ocTFLh46fgE",description:"Go through all the settings in zoom with the pros and cons of each in less than 23 minutes.", image:"https://i.imgur.com/aLYyQlJ.png",user_id:1)
Resource.create!(name: 'Adding Donut to your Slack Channel', categories: [env], link:"https://youtu.be/HF5Gnt4qeoM",description:"Customize your onboarding experience and do it all through Slack remotely.", image:"https://i.imgur.com/HQiY3VB.png",user_id:2)

p "#{Resource.count} resources were created"