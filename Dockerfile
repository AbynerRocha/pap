FROM mongo

ARG name=mongo

ENV MONGO_INITDB_ROOT_USERNAME=app
ENV MONGO_INITDB_ROOT_PASSWORD=test123

EXPOSE 27017:27017
