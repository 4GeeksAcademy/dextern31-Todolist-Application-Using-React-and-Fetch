import React, {useState, useEffect} from "react";


const TodoList = () => {
    const [toDos, setToDos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const url = "https://playground.4geeks.com/apis/fake/todos/user/dextern31";


    function updateTodosAPI() {
         fetch(url, {
        method: "Put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(toDos)
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        //console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {

    })
    .catch(error => {
        //error handling
        console.log(error);
    })};


    function getTodosAPI() { fetch(url, {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        //console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //here is where your code should start after the fetch finishes
       
        setToDos(data);        
        //console.log(data); //this will print on the console the exact object received from the server
        //return data;
    })
    .catch(error => {
        //error handling
        console.log(error);
    })};
    useEffect(() => {getTodosAPI()}, []);
    useEffect(() => {
        if(toDos.length) {
            updateTodosAPI()
        }
    }, [toDos]);
    
    
    const addToList = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            let newList = toDos.concat({done: false, id: toDos.length+1, label: inputValue});
            setToDos(newList);
            setInputValue("");
            console.log(newList);
        }
        
    };
    const itemsLeft = (list) => {
        if(list.length==0) {
            return (<li>
                        No tasks, add a task
                    </li>);
        }
        if(list.length==1){
            return (<li>
                1 item left
            </li>);
        }
        return (<li>
                    {list.length} items left
                </li>);
    }

    const delTask = (list, index) => {
        let delList = list.filter((item, currentIndex) => index != currentIndex);
        let newList = delList.map((item, index) =>  {
            return {...item, id: index+1};
        });
        setToDos(newList);
        console.log(newList);
    }
    
    
    return(
        <div id="container">
			<h1 className="todo-header">To do List</h1>
			<input onKeyDown={addToList} onChange={(e) => setInputValue(e.target.value)}
				value={inputValue} id="addToDo" type="text" placeholder="Add to do here" />
			<ul>
                {toDos.map((item, index) => (<li key={index}>
					<span onClick={() => delTask(toDos, index)}><i className="fa fa-trash"></i></span> {item.label}
				</li>))}
                {itemsLeft(toDos)}
			</ul>
		</div>
        
    );
};

export default TodoList;