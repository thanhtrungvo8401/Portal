module.exports = {
  async headers() {
    return [
      {
        source: '/library/:path*',
        headers: [
          { key: "Cache-Control", value: "public,max-age=31536000" }
        ]
      }
    ]
  }
}