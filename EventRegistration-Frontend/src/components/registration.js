import axios from 'axios'
var config = require('../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost + ':' + config.dev.backendPort

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})
export default {
  name: 'eventregistration',
  data() {
    return {
      persons: [],
      events: [],
      newPerson: '',
      personType: 'Person',
      newEvent: {
        name: '',
        eventDate: '2017-12-08',
        startTime: '00:00',
        endTime: '23:59'
      },
      selectedPerson: '',
      selectedEvent: '',
      errorPerson: '',
      errorEvent: '',
      errorRegistration: '',
      response: [],
    }
  },
  created: function () {
    // Initializing persons
    AXIOS.get('/persons')
      .then(response => {
        this.persons = response.data;
        this.persons.forEach(person => this.getRegistrations(person.name))
      })
      .catch(e => {this.errorPerson = e});

    AXIOS.get('/events').then(response => {this.events = response.data;
    console.log(this.events)}).catch(e => {this.errorEvent = e});

  },

  methods: {

    createPerson: function (personType, personName) {
      AXIOS.post('/persons/'.concat(personName), {}, {})
        .then(response => {
          this.persons.push(response.data);
          this.errorPerson = '';
          this.newPerson = '';
        })
        .catch(e => {
          e = e.response.data.message ? e.response.data.message : e;
          this.errorPerson = e;
          console.log(e);
        });
    },

    createEvent: function (newEvent) {
      console.log(newEvent.eventDate);
      let url = '';
      AXIOS.post('/event', {}, {params : newEvent})
      //AXIOS.post('/events/'.concat(newEvent.name), {}, {params : newEvent})
        .then(response => {
          console.log(newEvent);
          this.events.push(response.data);
          this.errorEvent = '';
          this.newEvent.name = this.newEvent.make = this.newEvent.movie = this.newEvent.company = this.newEvent.artist = this.newEvent.title = '';
        })
        .catch(e => {
          e = e.response.data.message ? e.response.data.message : e;
          this.errorEvent = e;
          console.log(e);
          console.log(newEvent.eventDate);
          console.log(newEvent);
        });
    },

    registerEvent: function (personName, eventName) {
      let event = this.events.find(x => x.name === eventName);
      let person = this.persons.find(x => x.name === personName);
      let params = {
        person: person.name,
        event: event.name
      };

      AXIOS.post('/register', {}, {params: params})
        .then(response => {
          person.events.push(event)
          this.selectedPerson = '';
          this.selectedEvent = '';
          this.errorRegistration = '';
        })
        .catch(e => {
          e = e.response.data.message ? e.response.data.message : e;
          this.errorRegistration = e;
          console.log(e);
        });
    },

    getRegistrations: function (personName) {
      AXIOS.get('/registrations/person/'.concat(personName))
        .then(response => {
          if (!response.data || response.data.length <= 0) return;

          let indexPart = this.persons.map(x => x.name).indexOf(personName);
          this.persons[indexPart].events = [];
          response.data.forEach(event => {
            this.persons[indexPart].events.push(event);
          });
        })
        .catch(e => {
          e = e.response.data.message ? e.response.data.message : e;
          console.log(e);
        });
    },
  }
}
