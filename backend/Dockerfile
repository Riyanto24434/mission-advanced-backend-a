# backend/Dockerfile
FROM node:18-alpine

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies di mode production (lebih ringan)
RUN npm ci --production

# Copy semua kode ke dalam container
COPY . .

# Port yang digunakan server
EXPOSE 3000

# Perintah untuk menjalankan server
CMD ["node", "src/server.js"]
