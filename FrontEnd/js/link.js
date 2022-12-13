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
                
              }
        }
    })
}
