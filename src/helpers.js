// example: '#foo=bar&foobar=bar%2Ffoo' => { foo: bar, foobar: 'bar/foo' }
export const decodeHashFragment = (hash) => {
  try {
    return hash
      .replace(/^#/, '')
      .split('&')
      .reduce((accumulated, expression) => {
        const parts = expression.split('=');
        if (parts.length !== 2) {
          return accumulated;
        }
        const [key, value] = parts;
        return {
          ...accumulated,
          [decodeURIComponent(key)]: decodeURIComponent(value),
        };
      }, {});
  } catch (error) {
    return {};
  }
}