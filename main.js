var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = Vue.createApp({
  data() {
    return {
      todos: []
    }
  }, 
  methods: {
    doAdd(event, value){
      let comment = this.$refs.comment
      if(!comment.value.length){
        return
      }

      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      comment.value = ''
    },
    doChangeState(item){
      item.state = item.state ? 0 : 1
    },
    doRemove(item){
      let index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  watch:{
    todos:{
      handler: function(todos){
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  created(){
    this.todos = todoStorage.fetch()
  }
}).mount('#app')