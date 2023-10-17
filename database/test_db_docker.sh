sudo docker build -t test-db .
sudo docker run -d -p 3000:3000 --name img-test-db test-db
