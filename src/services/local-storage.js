var storage = window.localStorage;

const accessor =  (key, value) => {
  if (value === undefined) {
    return get(key);
  }
  return set(key, value);
};

function get (key) {
  return JSON.parse(storage.getItem(key));
}

function set (key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

function remove (key) {
  return storage.removeItem(key);
}

function clear () {
  return storage.clear();
}

accessor.set = set;
accessor.get = get;
accessor.remove = remove;
accessor.clear = clear;

export default accessor;