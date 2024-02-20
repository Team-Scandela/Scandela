#!/bin/bash

cd ./server
mvn clean test jacoco:report

cd ../scandelapp
npx jest
