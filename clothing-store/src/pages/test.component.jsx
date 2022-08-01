import { useEffect, useState } from "react";

export const UseStateExample2 = () => {
    // const [count, setCount] = useState(0);


    // const handleAlert = () => {
    //     setTimeout(()=> {
    //         setCount(count+1)
    //         alert(`Alert count is : ${count}`)
    //     }, 3000)
    // }

    const [test1,setTest1] = useState(true);
    const [test2,setTest2] = useState(true);

    const myObj = {
        a: 'my value of a is ' + test1
    };

    var test = function (){
        console.log('value of test 1 is ' + test1)
    }

    useEffect(() => {
        test();
    }, [test])
    return(
        <div>
            {/* <h1>Count Value: {count}</h1>
            <button onClick={() => setCount(count+1)}>Increment Count</button> */}
            {/* setCount((prev) => prev +1) */}
            {/* <button onClick={handleAlert}>Alert current count</button> */}
            <h1>test1 value: {String(test1)}</h1>
            <h1>test2 value: {String(test2)}</h1>
            <button onClick={() => setTest1(!test1)}>Filp Test 1 Value</button>
            <button onClick={() => setTest2(!test2)}>Filp Test 2 Value</button>
        </div>
    )
}