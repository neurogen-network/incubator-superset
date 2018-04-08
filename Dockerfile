FROM debian:stretch

# Superset version

# Configure environment

ADD . /var/lib/superset
WORKDIR /var/lib/superset

CMD ["ls", "-l"]
