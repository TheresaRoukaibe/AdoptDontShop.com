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

adoption_pages.load_landing =()=> {
    const btn = document.getElementById("signin");
    const btn_register = document.getElementById("btn_reg");
     const error = document.getElementById("error_in");
     const error_reg = document.getElementById("error_register");
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
}else{
    window.location.href = "browse.html";
}
              }
        }
    })

    btn_register.addEventListener("click", async function(){
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
              console.log(resp_data);
              if(resp_data.status == "User Exists"){
               error_reg.innerText = "User with this email already exists!";
             }else if(resp_data.status == "User Added"){
               window.location.href = "#volunteer";
       }
    }
    })
}
