#!/bin/bash
cd /home/ubuntu/nbbang/server

export RDS_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_USERNAME --query Parameters[0].Value | sed 's/"//g')
export RDS_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export RDS_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_PORT --query Parameters[0].Value | sed 's/"//g')
export RDS_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_HOST --query Parameters[0].Value | sed 's/"//g')
export RDS_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_NAME --query Parameters[0].Value | sed 's/"//g')

export NODE_ENV="production"

npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all 
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

authbind --deep pm2 start index.js