# ონლაინ შესყიდვების მართვის სისტემა

## 🔐 უსაფრთხო ავტორიზაციის სისტემა
- მხოლოდ ადმინი (gigalabichi1) რეგისტრირებს ახალ მომხმარებლებს
- JWT ტოკენებით უსაფრთხო სესიები
- bcrypt ენკრიპტაცია პაროლებისთვის

## 📊 ძირითადი ფუნქციები
- ტვირთების ტრეკინგი სამი სტატუსით: დაკვეთილი → გზაშია → ჩამოსული
- მომწოდებლების მართვა და ინფორმაცია
- ინვოისების აღრიცხვა თარიღებით
- კონტეინერების მონიტორინგი (წონა/მოცულობა)
- ღირებულების ტრეკინგი ბილის ნომრებით
- Excel ექსპორტი

## 🌐 ონლაინ სისტემა
- PostgreSQL მონაცემთა ბაზა
- RESTful API real-time განახლებებით
- რესპონსიული ქართული ინტერფეისი
- Multi-user support

## 🚀 დაწყება
1. Clone: `git clone https://github.com/gigalabichi1/procurement-management-system.git`
2. Install: `npm install`
3. Setup Database: `npm run db:setup`
4. Start: `npm run dev`

## 📱 ტექნოლოგიები
- Frontend: React TypeScript
- Backend: Node.js Express
- Database: PostgreSQL
- Auth: JWT + bcrypt