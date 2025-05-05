FROM python:3.7-alpine

WORKDIR /server

COPY ./  /server/

RUN pip install mysql-connector-python\
    fastapi\
    uvicorn

EXPOSE 8000

CMD ["uvicorn", "server:app", "--proxy-headers","--host", "0.0.0.0", "--port", "8000"]