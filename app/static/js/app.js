/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const Upload = Vue.component('upload-form', {
   template: `
    <div class="my_form">
      <form id="uploadForm" ref ="uploadForm" action="api/upload"  @submit.prevent="uploadPhoto" enctype="multipart/form-data" method="POST">
      <h1>Upload Form</h1></br>
          <div class = "my_form">
              <label for ="Description">Description</label>
              <textarea class="form-control" name="Description" ref="Description" v-model = "Description"></textarea></br>
            </div>
            <div class ="my_form">
              <label for ="Photo_upload">Photo Upload</label></br>
              <input type="file" name= "Photo_upload" ref="Photo_upload"></br></br>
              <button v-bind:Photo="file" v-bind:Description="Description" @click="uploadPhoto"> Submit</button>
          </div>
        </form>  
    </div>
   `,
    data: function() {
       return {
        message: "File Upload Successful",
        file: "", 
        Description:""
       }
    },
    methods: {
        uploadPhoto()
        { 
        let uploadForm = document.getElementById('uploadForm'); 
        let form_data = new FormData(uploadForm); 

        fetch("/api/upload", {     
          method: 'POST', 
          body: form_data,
          headers: {         
            'X-CSRFToken': token
          },
            credentials: 'same-origin'
        })
            .then(function (response) { 
              return response.json();
              })   
            .then(function (jsonResponse) {       
              console.log(jsonResponse);
              })     
            .catch(function (error) {   
              console.log(error);
              });
        }
      }
});



const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here

        {path: "/upload", component: Upload},

        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
const app = new Vue({
    el: "#app",
    router,
    data:{
      Photo: null, Description: null
    }
});