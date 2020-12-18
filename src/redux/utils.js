export const filterExistingContents = (old = [], incoming = []) => {
  const set = new Set(
    old.map((r) => {
      return r._id;
    })
  );

  return incoming.filter((com) => {
    return !set.has(com._id);
  });
};
