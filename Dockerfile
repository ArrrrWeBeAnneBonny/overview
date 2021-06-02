FROM node:14.15.5
ENV NODE_ENV=production

RUN mkdir /dockerApp
ADD . /dockerApp
WORKDIR /dockerApp
RUN npm install
COPY . .

EXPOSE 3003
CMD ["npm", "start"]