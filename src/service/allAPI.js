import commonAPI from "./commonAPI"
import serverURL from "./serverUrl"

export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}
export const addProjectApi = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-project`,reqBody,reqHeader)
}

export const homeProjectApi = async ()=>{
    return await commonAPI("GET",`${serverURL}/home-projects`)
}


//all projectsApi called by projects

export const allProjectsApi = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-projects?search=${searchKey}`,"",reqHeader)
}

export const userProjectsApi = async (reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-projects`,"",reqHeader)
}


export const editProjectApi = async (pId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/${pId}/edit-project`,reqBody,reqHeader)
}


//editUserApi called by profile:put request to
export const editUserApi = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/user/edit`,reqBody,reqHeader)
}