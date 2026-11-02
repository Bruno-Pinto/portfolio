# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Keep dependency installation cached until the lockfile changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY next.config.ts tsconfig.json ./
COPY src ./src
COPY public ./public
# Public tracker settings are compiled into the static export, never runtime secrets.
ARG NEXT_PUBLIC_UMAMI_SCRIPT_URL=""
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID=""
ARG NEXT_PUBLIC_UMAMI_DOMAINS="brunopinto.net,www.brunopinto.net"
ENV NEXT_PUBLIC_UMAMI_SCRIPT_URL=$NEXT_PUBLIC_UMAMI_SCRIPT_URL \
    NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID \
    NEXT_PUBLIC_UMAMI_DOMAINS=$NEXT_PUBLIC_UMAMI_DOMAINS
RUN npm run build

FROM nginx:stable-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/out /usr/share/nginx/html

# Serve static files without a root process or a production Node.js runtime.
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
STOPSIGNAL SIGQUIT
# Skip the stock entrypoint: no runtime config rewriting is required.
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
