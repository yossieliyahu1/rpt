FROM    node:0.12.7

# Bundle app source
ADD . /src
WORKDIR /src

#ENV PORT 7777
EXPOSE  7777

CMD ["node","/src/server/main.js","7777"]

