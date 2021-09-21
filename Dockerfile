FROM node:14

# setup okteto message
COPY bashrc /root/.bashrc

WORKDIR /src

COPY package.json ./
RUN npm update

COPY . .
CMD ["node", "ping.js"]