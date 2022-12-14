const adoption_pages = {};

const base_url = "http://localhost:8000/api/v0.1/";

adoption_pages.Console = (title, values, oneValue = true) => {
    console.log('---' + title + '---');
    if(oneValue){
        console.log(values);
    }else{
        for(let i =0; i< values.length; i++){
            console.log(values[i]);
        }
    }
    console.log('--/' + title + '---');
}

adoption_pages.loadFor = (page) => {
    eval("adoption_pages.load_" + page + "();");
}

adoption_pages.getAPI = async(url) => {
    try{
        return await axios(url);
    }catch(error){
        axios_pages.Console("Error from Linking (GET)", error);
    }
}

adoption_pages.postAPI = async (url ,data) => {
    try{
        return await axios.post(
            url,
            data,
            {
                headers:{
                    'Content-Type' : 'application/json'
                }
            }
        ).then((response) => {return response}).catch((err) => console.log(err));
    }catch(error){
        axios_pages.Console("Error from Linking (POST)", error);
    }
}

adoption_pages.load_edit = async() => {
    const id = window.localStorage.getItem('id');
     const btn_edit = document.getElementById("save");
     const error_edit = document.getElementById("error_edit");
    btn_edit.addEventListener("click", async function(){
        const error_edit = document.getElementById("error_edit");
       const edit_fname = document.getElementById("edit_fname").value;
       const edit_lname = document.getElementById("edit_lname").value;
        const edit_email = document.getElementById("edit_email").value;
       const old_password = document.getElementById("old_password").value;
       const edit_address = document.getElementById("edit_address").value;
       const edit_password = document.getElementById("edit_password").value;
       if(edit_fname =="" || edit_lname=="" || edit_email=="" || old_password=="" || edit_address=="" || edit_password ==""){
           error.innerText = "Please fill all the fields!"
       }else{
           const edit_url = base_url + "user/update/"+id;
           const edit_data = {
               fname: edit_fname,
               lname: edit_lname,
               email: edit_email,
               new_password: edit_password,
               old_pass: old_password,
               location: edit_address

           };
             const response = await adoption_pages.postAPI(edit_url, edit_data);
             console.log(response);
            const resp_data = response.data;
             if(resp_data.status == "Wrong password"){
              error_edit.innerText = "Please enter your correct password to edit!";
            }else if(resp_data.status == "Info edited"){
              window.location.href = "profile.html";
      }else{
        error_edit.innerText = "Something went wrong! Could not edit :(";
      }
   }
   })
}

adoption_pages.load_add_dog = async() => {
    const id = window.localStorage.getItem('id');
     const btn_add_dog = document.getElementById("add");
     const error_adding = document.getElementById("error_adding");
    btn_add_dog.addEventListener("click", async function(){
       const dog_name = document.getElementById("dog_name").value;
       const dog_age = document.getElementById("dog_age").value;
        const dog_breed = document.getElementById("dog_breed").value;
       const dog_location = document.getElementById("dog_location").value;
       const dog_condition = document.getElementById("dog_condition").value;
       const dog_img = document.getElementById("dog_img");
       const formData = new FormData();
       formData.append('img_src', dog_img.files[0]);
       formData.append('name', dog_name);
       formData.append('age', dog_age);
       formData.append('breed', dog_breed);
        formData.append('found_in', dog_location);
        formData.append('condition', dog_condition);
       if(dog_name =="" || dog_age=="" || dog_breed=="" || dog_location=="" || dog_condition==""){
           error_adding.innerText = "Please fill all the fields!"
       }else{
           const add_url = base_url + "admin/add_dog/"+id;
        
             const response = await adoption_pages.postAPI(add_url, formData);
             console.log(response);
            const resp_data = response.data;
             if(resp_data.status == "Error Adding"){
              error_adding.innerText = "Something went wrong :(";
            }else if(resp_data.status == "Dog Added"){
              window.location.href = "admin.html";
      }
   }
   })
}

adoption_pages.load_saved = async () => {
     const user_id = window.localStorage.getItem('id');
     const status = document.getElementById("status");
    const get_saved= base_url + "user/get_saved/" +user_id;
    const response_saved = await adoption_pages.getAPI(get_saved);
    const saved_data = response_saved.data;
    const gallery = document.getElementById("gallery");
    if(saved_data.status.length == 0){
        status.innerText = "Nothing saved yet..."
    }else{
    for(let i =0; i< saved_data.status.length; i++){
       gallery.innerHTML += "<div class='pic'>" +"<h6>"+saved_data.status[i].name +"</h6>" + '<img src = "C:/Users/User/Desktop/adoptDontShop/BackEnd/storage/app/public/pets/' + saved_data.status[i].img_src + '">'+"</div";
    }
    }
}

adoption_pages.load_adopted = async () => {
    const user_id = window.localStorage.getItem('id');
    const status = document.getElementById("status");
    const get_adopted = base_url + "user/get_adopted/" +user_id;
    const response_adopted = await adoption_pages.getAPI(get_adopted);
    const adopted_data = response_adopted.data;
}

adoption_pages.load_dog_profile = async() => {
const url_string  = window.location.search;
const params = new URLSearchParams(url_string);
const id = params.get('id');
const get_dog_url = base_url + "pets/get_dog/"+id;
    const response_dog = await adoption_pages.getAPI(get_dog_url);
    const dog_data = response_dog.data;
const profile = document.getElementById('img');
profile.src = "C:/Users/User/Desktop/adoptDontShop/BackEnd/storage/app/public/pets/"+dog_data.status.img_src;
const name = document.getElementById('dog_title');
const breed = document.getElementById('dog_breed');
const age = document.getElementById('dog_age');
const loc = document.getElementById('dog_loc');
const cond = document.getElementById('dog_condition');
name.innerText = dog_data.status.name;
breed.innerText = dog_data.status.breed;
age.innerText = dog_data.status.age;
loc.innerText = dog_data.status.found_in;
cond.innerText = dog_data.status.condition;

const get_user_url = base_url + "user/get_user_info/" + dog_data.status.company_id;
const response = await adoption_pages.getAPI(get_user_url);
const data = response.data;
    const company = document.getElementById("company_email");
    company.innerText = data.status[0].email;

    const book_btn = document.getElementById("bookmark");
    book_btn.addEventListener("click", async function(){
          const user_id = window.localStorage.getItem('id');
        const save_url = base_url + "user/save_dog";
        const body = {
            user_id: user_id,
            dog_id: dog_data.status.id

        };
          const response = await adoption_pages.postAPI(save_url, body);
          const save_data = response.data;
          if(save_data.status == "Already Saved"){
            alert("Already saved this dog");
          }else if(save_data.status == "User Saved"){
            window.location.href = "browse.html";
            }
    });

    adopt.addEventListener("click", async function(){
    const user_id = window.localStorage.getItem('id');
      const adopt_url = base_url + "user/adopt_dog";
      const body = {
          user_id: user_id,
          dog_id: dog_data.status.id

      };
        const response = await adoption_pages.postAPI(adopt_url, body);
        const adopt_data = response.data;
        if(adopt_data.status == "Already Adopted"){
          alert("Already adopted this dog");
        }else if(adopt_data.status == "Dog Adopted"){
          window.location.href = "browse.html";
          }
  });
}

adoption_pages.load_gallery = async() => {
    const get_dogs_url = base_url + "pets/get_dog";
    const response_dogs = await adoption_pages.getAPI(get_dogs_url);
    const dogs_data = response_dogs.data;
    const gallery = document.getElementById("gallery_pics");
    for(let i =0; i< dogs_data.status.length; i++){
       gallery.innerHTML += "<div class='pic' onclick='seeDetails("+dogs_data.status[i].id+")'>" + '<img src = "C:/Users/User/Desktop/adoptDontShop/BackEnd/storage/app/public/pets/' + dogs_data.status[i].img_src + '">' +"</div";
    }
}

adoption_pages.load_browse = async() => {
    const id = window.localStorage.getItem('id');
    const get_user_url = base_url + "user/get_user_info/" + id;
    const response = await adoption_pages.getAPI(get_user_url);
    const data = response.data;
    const welcome = document.getElementById("greeting");
    welcome.innerText= "Welcome " +data.status[0].fname + " !";
}

adoption_pages.load_profile = async() => {
    const id = window.localStorage.getItem('id');
    const get_user_url = base_url + "user/get_user_info/" + id;
    const response = await adoption_pages.getAPI(get_user_url);
    const data = response.data;
    const profile_email = document.getElementById("user_email");
    const profile_name = document.getElementById("user_name");
    const profile_address = document.getElementById("user_address");
   profile_email.innerText= data.status[0].email;
   profile_address.innerText= data.status[0].location;
   profile_name.innerText = data.status[0].fname +" " + data.status[0].lname ;
}

adoption_pages.load_landing = () => {
    const btn = document.getElementById("signin");
    const btn_register = document.getElementById("btn_reg");
     const error = document.getElementById("error_in");
    btn.addEventListener("click", async function(){
        const user_email = document.getElementById("email_in").value;
        const user_pass = document.getElementById("password_in").value;
        if(user_email =="" || user_pass==""){
            error.innerText = "Please fill all the fields!"

        }else{
            const post_url = base_url + "user/login";
            const data = {
                email: user_email,
                password: user_pass

            };
              const response = await adoption_pages.postAPI(post_url, data);
              const resp_data = response.data;
              if(resp_data.status == "Wrong Password"){
                error.innerText = "Please make sure of password!";
              }else if(resp_data.status == "Email not found"){
                error.innerText = "Account does not exist. Please register first!";
              }else{
if(resp_data.status.user_type_id == 1){
    window.location.href = "admin.html";
    window.localStorage.setItem('id', resp_data.status.id);
}else{
    window.location.href = "browse.html";
    window.localStorage.setItem('id', resp_data.status.id);
}
              }
        }
    })

    btn_register.addEventListener("click", async function(){
         const error_reg = document.getElementById("error_reg");
        const new_fname = document.getElementById("lname").value;
        const new_lname = document.getElementById("fname").value;
         const new_email = document.getElementById("email").value;
        const new_pass = document.getElementById("password").value;
        const new_address = document.getElementById("address").value;
        const new_type = document.getElementById("type").value;
        if(new_fname =="" || new_lname=="" || new_email=="" || new_pass=="" || new_address=="" || new_type ==""){
            error.innerText = "Please fill all the fields!"
        }else{
            const post_url = base_url + "user/signup";
            const data = {
                fname: new_fname,
                lname: new_lname,
                email: new_email,
                password: new_pass,
                address: new_address,
                user_type: new_type

            };
              const response = await adoption_pages.postAPI(post_url, data);
              const resp_data = response.data;
              if(resp_data.status == "User Exists"){
               error_reg.innerText = "User with this email already exists!";
             }else if(resp_data.status == "User Added"){
               window.location.href = "#volunteer";
       }
    }
    })
}
