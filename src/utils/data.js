function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function receiveData(key) {
  return JSON.parse(localStorage.getItem(key));
}

export {saveData, receiveData}
