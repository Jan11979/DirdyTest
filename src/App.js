import logo from './logo.svg';
import './App.css';
import React, {useEffect} from "react";
import {useState} from "react";
/*import React, { Component } from 'react'*/
import Select from 'react-select';
import ReactDOM from "react-dom";


function ConsoleLog(props) {
    console.log(props.text);
    return null;
}

function ShoppingList(props) {
    return (
        <div className="shopping-list">
            <h1>Shopping List for {props.name}</h1>
            <ul>
                <li>Dominosteine</li>
                <li>Wein</li>
                <li>Kamin</li>
            </ul>
        </div>
    );
}

function ButtonBox(props) {
    let [text, setText] = useState("X")
    const buttonHandler = () => {
        if (text === "X") {
            setText("O")
        } else
            setText("X")
    }
    return (
        <button className="square" onClick={buttonHandler}> {text} </button>
    );
}

function InputBox(props) {
    let [text, setText] = useState("Maiu")
    return (
        <form><label>Mukki:
            <input type="text" value={text}/>
        </label></form>
    )

}

function MyForm() {
    const [name, setName] = useState("Jan");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name);
    }
    const handleBlur = (event) => {
        event.preventDefault();
        console.log(name);
    }

    return (
        <form onSubmit={handleSubmit} onBlur={handleBlur}>
            <label>Enter your name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <input type="submit"/>
        </form>
    )
}

async function getAll(src) {
    const response = await fetch(src)
    if (response.status != 200) {
        alert("Achtung!!!\nStatus ist nicht 200!");
        return 0;
    }
    const body = await response.json()
    const result = await body;
    return result
}

/*
ndefined
data:
    info:
        count: 826
        next: "https://rickandmortyapi.com/api/character/?page=2"
        pages: 42
        prev: null

    results: Array(20)
        0: {id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', …}
        1: {id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', type: '', …}
        2: {id: 3, name:

 */
let dirty = 1;
function SchreibeEineFunctionDieEinNeuesArrayNurMitDenLebendenMenschenerstellt(data, allData) {
    let size = data.results.length;
    for (let i = 0; i < size; i++) {
        let obj = new Object();
        obj.id  = data.results[i].id;
        obj.name = data.results[i].name;
        if(allData == null)
        {
            allData = new Array();
            allData[0] = obj;
        }
        else{
            allData.push(obj);
        }
    }

    if (data.info.next === null) {
        dirty = 2;
        return allData;
    } else
    {
        getAll(data.info.next)
            .then(data => SchreibeEineFunctionDieEinNeuesArrayNurMitDenLebendenMenschenerstellt(data, allData));
    }
}


function Init(props) {
    console.log("Init");
    /* Ricki2();*/
    console.log(props);

    return null;
}

function DropBox(props) {
    const [name, setName] = useState("Jan");
    const handleChange = (event) => {
        setName(event.target.value);
        console.log(event.target.value);
    }
    return (
        <div>
            <select onChange={handleChange}>
                {props.options.map((e) => (<option key={e.id} value={e.id}>{e.name}</option>))}
            </select>
        </div>
    );
}
/*
Bevor du deine divs anzeigen lässt, musst du sicher gehen, das diese schon da sind. kannst z.B. über
 {Charakters && <div></div>}, damit wird dein div erst geladen, wenn characters auch gesetzt ist
 */
/*/*https://rickandmortyapi.com/api/character/?name=rick&status=alive*/
function App() {
    const [options, setOptions] = useState();
    let allData = null;
    useEffect(() => {
        getAll("https://rickandmortyapi.com/api/character/?name=rick&status=alive")
            .then(data => setOptions(SchreibeEineFunctionDieEinNeuesArrayNurMitDenLebendenMenschenerstellt(data, allData)));
    },[]  )


    return (
        <div className="App">
            < ConsoleLog text="Miau"/>
            < Init name="hallo"/>
            <header className="App-header">

                { options && console.log("options &&  console.log")
                   <DropBox options={options}/> }
            </header>


        </div>
    );
}


export default App;
