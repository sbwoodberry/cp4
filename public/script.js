var app = new Vue({
  el: '#app',
  data: {
    contacts: [],
    aptNumber: "",
    lastName: "",
    firstName: "",
    email: "",
  },
  created() {
    this.getContacts();
  },
  methods: {
    async getContacts() {
      try {
        //console.log("Got in getContacts.");
        let response = await axios.get("/api/contacts");
        this.contacts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async add() {
      try {
        //console.log("Got in add.");
        let response = await axios.post('/api/contacts', {
          aptNumber: this.aptNumber,
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email
        });
        this.aptNumber = "";
        this.lastName = "";
        this.firstName = "";
        this.email = "";
        this.getContacts();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteContact(contact) {
      try {
        //console.log(contact._id);
        let response = await axios.delete("/api/contacts/" + contact._id);
        this.getContacts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
