---
title: "Browser Networking"
pubDate: "2024-04-13"
---

- fetch HTML
- request/response headers
- parse HTML, fetch resources, and make a offline available one-pager (or multiple ressources?)
  - replace `<script src="">` with inline `<script>`
  - replace `<link rel="stylesheet" href="">` with inline `<style>`
  - replace `<img src="">` with inline images `data:MIME_TYPE;base64,data`
- follow redirects

Optimize

- fetch with compression
- fetch stream (text encodings)
- http2 client

Go Deeper

- implement fetch with https
- implement https with tls
- implement tls with tcp
- implement tcp with tun device by writing ip packets
- implement ip with tap device by writing ethernet packets
