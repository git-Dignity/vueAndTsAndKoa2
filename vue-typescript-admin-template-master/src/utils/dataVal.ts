
const getVal = (obj: any, ...args:any) => {
    let out = null
    if (obj || obj === 0) {
      out = obj
      if (args && args.length > 0) {
        for (let index = 0; index < args.length; index++) {
          const key = args[index]
          out = out[key]
          if (out === undefined || out === null || out === '') {
            return null
          }
        }
      } else {
        if (out === undefined || out === null || out === '') {
          return null
        }
      }
    }
    return out
  }
  
  const toVal = (obj: any, ...args: any) => {
    const val = getVal(obj, ...args)
    return val === null ? '--' : val
  }
  

  export {
    getVal,
    toVal
  }