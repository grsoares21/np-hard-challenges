module.exports = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/challenges",
        permanent: true,
      },
    ];
  },
};
