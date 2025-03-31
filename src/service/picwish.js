import axios from "axios";
export const createTaskId = async (file) => {
   try {
    let API_KEY = import.meta.env.VITE_API_KEY
    const formData = new FormData();
    formData.append('image_file', file);
    const response = await axios.post("https://techhk.aoscdn.com/api/tasks/visual/scale", formData, {
        headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "multipart/form-data",
        },
    })

    if(response.data.status === 200) {
       return response.data.data.task_id
    }
    else {
        console.log("error: ", response.data.message);
        return null
    }

   } catch (error) {
    console.log("error.message: ", error.message); 
   }

}

export const taskIdResult = async (task_id) => {
   try {
    let API_KEY = import.meta.env.VITE_API_KEY
    const response = await axios.get(`https://techhk.aoscdn.com/api/tasks/visual/scale/${task_id}`,  {
        headers: {
            "X-API-KEY": API_KEY,
        },
    })


if(response.data.data.state === 4){
    return taskIdResult(task_id)
}


    if(response.data.status === 200) {
        return response.data.data.image
    }
    else {
        console.log("error: ", response.data.message);
        return null
    }

   } catch (error) {
    console.log("error.message: ", error.message); 
   }

}


export const createTaskIdBg = async (file) => {
    try {
        let API_KEY = import.meta.env.VITE_API_KEY
        const formData = new FormData();
        formData.append('image_file', file);
          const response = await axios.post("https://techhk.aoscdn.com/api/tasks/visual/segmentation", formData, {
            headers: {
                "X-API-KEY": API_KEY,
                "Content-Type": "multipart/form-data",
            },
        })

        if (response.data.status === 200) {
            return response.data.data.task_id
        }
        else {
            console.log("error: ", response.data.message);
            return null
        }

    } catch (error) {
        console.log("error.message: ", error.message);
    }
}


export const taskIdResultBG = async (task_id) => {
    try {
        let API_KEY = import.meta.env.VITE_API_KEY
            const response = await axios.get(`https://techhk.aoscdn.com/api/tasks/visual/segmentation/${task_id}`,  {
                headers: {
                    "X-API-KEY": API_KEY,
                },
            })
        
        
        if(response.data.data.state === 4){
            return taskIdResultBG(task_id)
        }
        
        
            if(response.data.status === 200) {
                return response.data.data.image
            }
            else {
                console.log("error: ", response.data.message);
                return null
            }
        
           } catch (error) {
            console.log("error.message: ", error.message); 
           }
        
}