# Usar una imagen oficial de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo de dependencias
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación
COPY ./app /app/app

# Exponer el puerto en el que corre la aplicación
EXPOSE 5000

# Comando para correr la aplicación
# Usamos gunicorn para un servidor WSGI de producción
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app.main:create_app()"]
