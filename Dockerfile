FROM node:19.7.0-buster AS builder

WORKDIR /build
ENV NODE_ENV=production

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install --immutable

# Block-lists are problematic. Ensure good use of layers
# and no problems running yarn docker:extractBuildCache by 
# explicitly including only what we need.
# ordered to be optimistic about what layers may already
# be cached on the remote deployed server.

COPY src src
COPY gatsby-config.js gatsby-config.js
COPY gatsby-node.js gatsby-node.js
COPY static static
COPY content content
COPY .cache .cache  
COPY public public

RUN yarn gatsby build

FROM nginx:latest

COPY --from=builder /build/public /public
COPY nginx.conf /etc/nginx/nginx.conf
