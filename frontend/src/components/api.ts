import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { textState, loadingState } from "../App"


export async function Api(files : any, input : any, loading: any, setFail:any) {
    loading(true)
    const reader = new FileReader
    await reader.readAsText(files[0])
    reader.onload = async () => {
        let response = await fetch('http://localhost:4000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: reader.result})});
        let something = await response.json()
        if (something["status"] === "fail"){
            setFail(true)
        }else{ 
            input({solution: reader.result, occurrence: something["occurrence"], mentor_note: something["mentor_note"]})
        }
        }
    loading(false)
}

export async function LoginInApi(email : string, password : string, setFail : any) {
    console.log("email", email)
    let response = await fetch('http://localhost:4000/api/sign_ins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: {email: email, password: password}})});
    let something = await response.json()
    console.log(something)
    if (typeof something["token"] === "string"){
    localStorage.setItem('Key', something["token"])
    window.location.href = "/";}else{

        setFail([true, something["details"]])
    }
}

export async function SignUpApi(email : string, password : string, confirmPassword : string, setFail : any) {
    console.log(email, password, confirmPassword)
    let response = await fetch('http://localhost:4000/api/sign_ups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: {email: email, password: password, password_confirmation: confirmPassword}})});
    let something = await response.json()
    console.log(something)
    if (typeof something["token"] === "string"){
    localStorage.setItem('Key', something["token"])
    window.location.href = "/";}else{
        setFail([true, something["details"]])
    }
}

export async function GetSolutions(updateSolution : any){
    let response = await fetch(`http://localhost:4000/api/solutions?auth_token=${localStorage.getItem('Key')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
    },});
    let something = await response.json()
    if (something["solution"]){
    updateSolution(something["solution"])}
    console.log(something)
}

export async function GetSolution(updateSolution : any, id : any,onchange:any,){
    console.log(`id ${id}`)
    let response = await fetch(`http://localhost:4000/api/solution/${id}?auth_token=${localStorage.getItem('Key')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
    },});
    let something = await response.json()
    console.log(something)
    if (something["solution"]){
    updateSolution({solution: something["solution"][0], occurrence: something["solution"][1], mentor_note: something["solution"][2]})
    onchange(something["solution"][2])}
    console.log(something)
}

export async function UpdateApi(updateSolution : any, id : any, failStatus : any, sucssesStatus : any){
    let response = await fetch(`http://localhost:4000/api/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({mentor : updateSolution, "auth_token": localStorage.getItem('Key')})});
    let something = await response.json()
    if (something["status"] === "good"){
        sucssesStatus(true)
    }else{
        failStatus(true)
    }
}