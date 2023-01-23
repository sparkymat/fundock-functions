FROM denoland/deno:alpine-1.29.1

USER deno

WORKDIR /app
ADD . .
RUN deno cache main.ts

CMD ["run", "main.ts"]
