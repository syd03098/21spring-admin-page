FROM python:3.8

WORKDIR /opt/oracle
RUN apt-get update && apt-get install -y libaio1 \
    && wget https://download.oracle.com/otn_software/linux/instantclient/211000/instantclient-basiclite-linux.x64-21.1.0.0.0.zip \
    && unzip instantclient-basiclite-linux.x64-21.1.0.0.0.zip \
    && rm -f instantclient-basiclite-linux.x64-21.1.0.0.0.zip \
    && cd /opt/oracle/instantclient* \
    && rm -f *jdbc* *occi* *mysql* *README *jar uidrvci genezi adrci \
    && echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf \
    && ldconfig

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
ENV DJANGO_LOG_LEVEL DEBUG
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
