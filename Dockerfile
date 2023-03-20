FROM node:19.7.0-buster AS builder

WORKDIR /build
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . .

RUN yarn gatsby build

FROM nginx:latest

COPY --from=builder /build/public /public
COPY nginx.conf /etc/nginx/nginx.conf
