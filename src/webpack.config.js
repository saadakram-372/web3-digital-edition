module.exports = {
  // other webpack configurations...

  resolve: {
    fallback: {
      buffer: false,
      timers: false,
    },
  },
};
