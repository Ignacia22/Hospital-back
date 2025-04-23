# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe) al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Compila el proyecto con TypeScript
RUN npm run build

# Expone el puerto donde se ejecutará la app
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
