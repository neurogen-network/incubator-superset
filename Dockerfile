FROM debian:stretch

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    PYTHONPATH=/etc/superset:/home/superset:$PYTHONPATH \
    SUPERSET_HOME=/var/lib/superset

# Create superset user & install dependencies
RUN useradd -U -m superset && \
    mkdir /etc/superset  && \
    mkdir ${SUPERSET_HOME} && \
    chown -R superset:superset /etc/superset && \
    chown -R superset:superset ${SUPERSET_HOME} && \
    apt-get update && \
    apt-get install -y \
        build-essential \
        curl \
        libffi-dev \
        libldap2-dev \
        libpq-dev \
        libsasl2-dev \
        libssl-dev \
        openjdk-8-jdk \
        python3-dev \
        python3-pip && \
     apt-get clean && \
     rm -r /var/lib/apt/lists/* && \
     pip3 install --upgrade setuptools && \
     pip3 install --no-cache-dir \
        flask-cors==3.0.3 \
        flask-mail==0.9.1 \
        flask-oauth==0.12 \
        flask_oauthlib==0.9.3 \
        gevent==1.2.2 \
        impyla==0.14.0 \
        pyathenajdbc==1.2.0 \
        pyhive==0.5.0 \
        pyldap==2.4.28 \
        redis==2.10.5 \
        sqlalchemy-redshift==0.5.0 \
        sqlalchemy-clickhouse==0.1.1.post3 \
        Werkzeug

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get -y update && apt-get install -y yarn
COPY . /home/superset
WORKDIR /home/superset/superset/assets
RUN yarn && yarn build

WORKDIR /home/superset
COPY deploy /usr/local/bin

RUN pip3 install -e .

VOLUME /etc/superset \
       /var/lib/superset \
       /home/superset

RUN apt-get remove --purge -y ${BUILD_DEPS} nodejs yarn
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN rm -rf /usr/local/incubator-superset/superset/assets/node_modules

# Deploy application
EXPOSE 8088
HEALTHCHECK CMD ["curl", "-f", "http://localhost:8088/health"]
ENTRYPOINT ["superset"]
CMD ["runserver"]
USER superset
