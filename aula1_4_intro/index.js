console.log(process.argv)

const num = parseInt(process.argv[2])
const mult = []
for (let i=0; i<num; i++){
  if(i%3==0 || i%5==0){
    mult.push(i)
  }
}

console.log(mult)