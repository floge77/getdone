# register a user
curl --request POST --data '{"username": "florian", "email": "fg@gmail.com", "password": "tester"}' -H "Content-Type: application/json" http://localhost:3000/auth/register

# signin an already created user
curl --request POST --data '{"username": "florian", "password": "tester"}' -H "Content-Type: application/json" http://localhost:3000/auth/login
