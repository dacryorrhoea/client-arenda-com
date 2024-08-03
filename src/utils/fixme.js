function notAsyncFixMe(funcs) {
  for (let i = 0; i < funcs.length; i++) {
    funcs[i]()
  }
}

export {notAsyncFixMe}