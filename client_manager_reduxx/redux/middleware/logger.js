 const logger=param=>store=>next=>action=>{

console.log("logged",store);
next(action);
}
export default logger