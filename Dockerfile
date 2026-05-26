FROM node:20-alpine

# Add libc6-compat for Next.js
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
