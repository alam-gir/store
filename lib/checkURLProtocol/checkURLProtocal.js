const checkURLProtocol = (string) => {
  try {
    const url = new URL(string);
    return url.protocol.slice(0,url.protocol.length-1);
  } catch (error) {
    return false;
  }
};

export { checkURLProtocol };
