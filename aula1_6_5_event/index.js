import ev from './event.js'

ev.on('testEvent', ()=>{
  console.log('Ouviu também')
})

ev.emit('testEvent', 'abcdef')