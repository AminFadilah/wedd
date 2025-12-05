# Base image wajib Node 20+
FROM node:20

WORKDIR /app

# Copy deps dahulu agar caching lebih efisien
COPY package*.json ./
RUN npm install

# Copy semua file project
COPY . .

# Build NEXT (untuk production)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
