import { Dispatch, SetStateAction } from 'react';
import { RepresenterFiles } from '../App';
import { FileWithPath } from 'react-dropzone';


/**
 * Send solution file to the backend with the representer and update the state with the result
 * @param  {FileWithPath[]} files The file to send
 * @param  {Dispatch<SetStateAction<RepresenterFiles>>} UpdateRepresnterFiles Dispatcher that updates solution and feedback
 * @param  {Dispatch<SetStateAction<RepresenterFiles>>} loading Dispatcher to set the page in a loading mode
 * @param  {Dispatch<SetStateAction<RepresenterFiles>>} setFail Disptacher to set if the request failed
 */
export async function Api(files : FileWithPath[], UpdateRepresnterFiles : Dispatch<SetStateAction<RepresenterFiles>>, loading: Dispatch<SetStateAction<boolean>>, setFail: Dispatch<SetStateAction<boolean>>) {

    // Set the page in a loading mode
    loading(true)

    // Create a new FileReader
    const reader = new FileReader

    // Set the reader to read the file as a text
    await reader.readAsText(files[0])

    // When the reader is done reading the file run an async function
    reader.onload = async () => {

        // Send a post request to the backend with the solution file
        let response = await fetch('http://localhost:4000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({solution: reader.result})
        });

        // Fetch the response as json
        let data = await response.json()

        // If the request failed set the fail state to true else update the solution and feedback
        if (data["status"] === "fail"){
            setFail(true)
        }else{ 
            if (typeof reader.result === "string"){
                UpdateRepresnterFiles({solution: reader.result, occurrence: data["occurrence"], mentor_note: data["mentor_note"]})
            }
        }
    }

    // Set the page out of the loading mode
    loading(false)
}



/**
 * Send a login request to the backend and update the state with the result
 * @param  {string} email Users email
 * @param  {string} password Users password
 * @param  {Dispatch<SetStateAction<RepresenterFiles>>} setFail Disptacher to set if the request failed with the reason
 */
export async function LoginInApi(email : string, password : string, setFail : Dispatch<SetStateAction<Array<boolean | string>>>) {

    // Send a post request to the backend with the email and password
    let response = await fetch('http://localhost:4000/api/sign_ins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: {email: email, password: password}})
    });

    // Fetch the response as json
    let data = await response.json()

    // If the response includes a token save it in the local storage and redirect the user to the home page
    // else set the fail state to true with the reason
    if (typeof data["token"] === "string"){
        localStorage.setItem('Key', data["token"])
        window.location.href = "/"
    }else{

        // If the response includes a details key set the fail state to true with the reason
        if (typeof data["details"] === "string"){
            setFail([true, data["details"]])
        }else{
            setFail([true, "something went wrong"])
        }
    }
}


/**
 * Send a singup request to the backend and update the state with the result
 * @param  {string} email Users email
 * @param  {string} password Users password
 * @param  {string} confirmPassword Users password
 * @param  {Dispatch<SetStateAction<RepresenterFiles>>} setFail Disptacher to set if the request failed with the reason
 */
export async function SignUpApi(email : string, password : string, confirmPassword : string, setFail : Dispatch<SetStateAction<Array<boolean | string>>>) {

    // Send a post request to the backend with the email, password and password confirmation
    let response = await fetch('http://localhost:4000/api/sign_ups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: {email: email, password: password, password_confirmation: confirmPassword}})
    });

    // Fetch the response as json
    let data = await response.json()

    // If the response includes a token save it in the local storage and redirect the user to the home page
    // else set the fail state to true with the reason
    if (typeof data["token"] === "string"){
        localStorage.setItem('Key', data["token"])
        window.location.href = "/";
    }else{
        setFail([true, data["details"]])
    }
}


/**
 * Send a get request to the backend to get the solutions and update the state with the result
 * @param  {Dispatch<SetStateAction<Array<Array<string | number>>>>} updateSolution Dispatcher to update the solutions
 * @param  {string} page The page number
 */
export async function GetSolutions(updateSolution : Dispatch<SetStateAction<Array<Array<string | number>>>>, page : number){

    // Send a get request to the backend with the page number and the authtoken gatherd from the local storage
    let response = await fetch(`http://localhost:4000/api/solutions/${page}?auth_token=${localStorage.getItem('Key')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Fetch the response as json
    let data = await response.json()

    // If the response includes a solutions key update the state with the solutions
    if (data["solution"]){
    updateSolution(data["solution"])
    }

}

/**
 * Send a get request to the backend to get a solutions data and update the state with the result
 * @param  {Dispatch<SetStateAction<Array<Array<string | number>>>>} updateSolution Dispatcher to update the solutions
 * @param  {string | undefined} id The id of the solution
 * @param  {Dispatch<SetStateAction<string>>} onchange Dispatcher to update the mentor note
 */

export async function GetSolution(updateSolution:  Dispatch<SetStateAction<RepresenterFiles>>, id: string | undefined, onchange: Dispatch<SetStateAction<string>>){

    // Send a get request to the backend with the id and the authtoken gatherd from the local storage
    let response = await fetch(`http://localhost:4000/api/solution/${id}?auth_token=${localStorage.getItem('Key')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Fetch the response as json
    let data = await response.json()
    // If the response includes a solutions key update the state with the solutions
    if (data["solution"]){
        updateSolution({solution: data["solution"][0], occurrence: data["solution"][1], mentor_note: data["solution"][2]})
        onchange(data["solution"][2])
    }
}

/**
 * Send a put request to the backend to update a solutions mentor notes and update the state
 * @param  {string | undefined} updateSolution The updated mentor notes
 * @param  {string | undefined} id The id of the solution
 * @param  {Dispatch<SetStateAction<boolean>>} failStatus Disptacher to set if the request failed 
 * @param  {Dispatch<SetStateAction<boolean>>} sucssesStatus Disptacher to set if the request sucsseded 
 */

export async function UpdateApi(updateSolution: string | undefined, id : string | undefined, failStatus : Dispatch<SetStateAction<boolean>>, sucssesStatus : Dispatch<SetStateAction<boolean>>){

    // Send a put request to the backend with the id, the updated mentor notes and the authtoken gatherd from the local storage
    let response = await fetch(`http://localhost:4000/api/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({mentor : updateSolution, "auth_token": localStorage.getItem('Key')})
    });

    // Fetch the response as json
    let data = await response.json()

    // If the response includes a status key set the sucsses state to true or the fail state to true
    if (data["status"] === "good"){
        sucssesStatus(true)
    }else{
        failStatus(true)
    }
}


/**
 * Send a get request to the get the amount of solutions
 * @param  {Dispatch<SetStateAction<number>>} UpdateCount Disptacher to update the amount of solutions
 */
export async function CountApi(UpdateCount : Dispatch<SetStateAction<number>>){

    // Send a get request to the backend with the authtoken gatherd from the local storage
    let response = await fetch(`http://localhost:4000/api/nbr_solutions/?auth_token=${localStorage.getItem('Key')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    // Fetch the response as json
    let data = await response.json()

    // Update the state with the amount of solutions
    UpdateCount(data["amount"])
}
