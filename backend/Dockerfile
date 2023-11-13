ARG PYTHON_VER=3.11

FROM python:${PYTHON_VER} AS base

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt 

CMD python main.py