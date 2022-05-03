export default {
  computed: {
    username(){
      return this.$route.params.username
    },
  },
  methods: {
    goToDashbord(){
      if(isAuthenticated){
        this.$router.path('/dashbord')
      }else{
        this.$router.push('/login')
      }
    },
  },
}