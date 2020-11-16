import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)
import EventRegistration from '@/components/EventRegistration'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/app',
      name: 'EventRegistration',
      component: EventRegistration,
      data: function() {
        return {
          people: [],
          newPerson: '',
          errorPerson: '',
          response: []
        }
      },
      created: function () {
        // Test data
        const p1 = new PersonDto('John')
        const p2 = new PersonDto('Jill')
        // Sample initial content
        this.people = [p1, p2]
      },
      methods: {
        createPerson: function (personName) {
          // Create a new person and add it to the list of people
          var p = new PersonDto(personName)
          this.people.push(p)
          // Reset the name field for new people
          this.newPerson = ''
        }
      }
      //...
    },
  
  ]
})
