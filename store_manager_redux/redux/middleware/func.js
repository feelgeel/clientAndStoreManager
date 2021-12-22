const fnc=({dispatch,getState})=>next=>action=>{
    // console.log(store)
    if (typeof action==='function')action(dispatch,getState)
    else next(action)
    }
    export default fnc