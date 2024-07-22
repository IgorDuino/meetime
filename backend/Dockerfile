# Используем официальный образ Python
FROM python:3.10-slim

# Устанавливаем зависимости системы
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем Poetry
RUN pip install poetry

# Объявляем переменные среды для Poetry
ENV POETRY_HOME=/root/.poetry
ENV PATH="$POETRY_HOME/bin:$PATH"
ENV POETRY_VIRTUALENVS_CREATE=false

# Создаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY pyproject.toml poetry.lock /app/

# Устанавливаем зависимости проекта через Poetry
RUN poetry install --no-dev

# Копируем оставшиеся файлы проекта
COPY . /app

# Указываем порт для приложения
EXPOSE 8000

# Команда для запуска приложения
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
