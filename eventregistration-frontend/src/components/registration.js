import axios from 'axios'
var config = require('../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost + ':' + config.dev.backendPort

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})
function PersonDto (name) {
  this.name = name
  this.events = []
}

function EventDto (name, date, start, end) {
  this.name = name
  this.eventDate = date
  this.startTime = start
  this.endTime = end
}
export default {
  name: 'eventregistration',
  data () {
    return {
      people: [],
      newPerson: '',
      errorPerson: '',
      response: []
    }
  },
  //...
created: function () {
  // Test data
  //const p1 = new PersonDto('John')
  //const p2 = new PersonDto('Jill')
  // Sample initial content
  //this.people = [p1, p2]
 AXIOS.get(`/persons`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.people = response.data
    })
    .catch(e => {
      this.errorPerson = e;
    });
},
	methods: {
  createPerson: function (personName) {
    // Create a new person and add it to the list of people
 //   var p = new PersonDto(personName)
   // this.people.push(p)
    // Reset the name field for new people
   // this.newPerson = ''
	  AXIOS.post(`/persons/`+personName, {}, {})
  .then(response => {
    // JSON responses are automatically parsed.
    this.people.push(response.data)
    this.newPerson = ''
    this.errorPerson = ''
  })
  .catch(e => {
    var errorMsg = e.message
    console.log(errorMsg)
    this.errorPerson = errorMsg
  });
  }
	}
}
