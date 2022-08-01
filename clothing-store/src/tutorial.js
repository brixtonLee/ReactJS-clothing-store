/*
  React Hooks
    1. React Hooks can only be used in functional component

    useState
    1. Use State returns two things which can be accessed using array destructuring
    2. The first one is the state that we are trying to set
    3. The second thing is the function that we use to set the first param state
    4. What we passed into useState is the initial value that we want the state to be edited
    5. We can use as many useState as we want

    useSelector
    1. 'useSelector' is to replace the mapStateToProps function
    2. E.g - const currentUser = useSelector(selectCurrentUser);
    3. The selectCurrentUser selector is going to re-render whenever the state of the current user has changed

    useDispatch
    1. We can just write the line below and we are able to directly access to the dispatch method.
    E.g - const dispatch = useDispatch();
    2. The anonymous function (in the useEffect) is going to be defined as new every single time the component is re-render hence it will cause the useEffect hooks to render again and again because the reference to the anonymous function has changed
    3. The dispatch method is going to be defined once only because React will store it at the background and check whether the dispatch method exist everytime the component re-render
    4. So we are putting the dispatch method in the second param of the useEffect because it is never going to be re-rendered
    E.g - useEffect(() => { dispatch(checkUserSession()); },[dispatch])

    useCallback
    1. It will ensure the anonymous function persist throughout the re-render so that the useEffect won't get run every single time the functional component is re-rendered
    E.g const myFunc = useCallback(() => {
      console.log('123')
    }, [test1])
    2. Whenever the test1 state changed, this function will get called / get reassigned
    3. Or you can write the function inside the useEffect hence it will only render one time

    useMemo
    1. useCallback is to memorize function while useMemo is to memorize object
    2. The object is same as the function (no matter anonymous which will be reassigned when the functional component is re-rendered
    3. E.g const myObj = useMemo(() => ({
      a: 'my value of a is ' + test1
    }), [test1])

    useLayoutEffect
    1. This will render before the dom paint
    2. It is same as the useEffect but only the first point is different

    useRef
    1. This is the hooks that enable us to access to the some persistence value (not only dom, but also object) across re-render (to keep the value reference same across re-render)
    2. every dom has the reference which can be accessed through ref tag

    useEffect hook 
    1. It is mimicing the componentDidMount method and update life cycle method
    2. Whenever the component get re-rendered, this useEffect will be called
    3. The first param is the function that will get called whenever the component re-render, it must not be the async function
    4. The second param is the properties / state that if it has changed, the useEffect first param will be fired
    5. You can pass in empty array to the second param so that useEffect is only called once
    5. useEffect cannot be called inside the conditional component
    6. The first param can return the function which is known as clean up function which will get called when the component is unmounted
    7. The clean up function is to clean up the useEffect

    customHook
    1. use-functionality.effect.js for naming practice
    2. import useState, useEffect from react
    3. create the function

    useReducer
    1. const[state,dispatch] = useReducer(reducer, INITIAL_STATE);
    2. declare the reducer function which is same as the redux reducer
    3. declare the action which is same as the redux action
    4. const {user, searchQuery} = state
    5. Where you want to dispatch the action into, which the dispatch(actionName(param));
*/

/* Firebase Authentication:
1. The user will remain sign in (either refresh or reopen the page) until he/she clicks on the sign out button
2. The onAuthStateChanged will be invoked whenever any details related to the user has changed (either from other sources, login, etc)
3. The onAuthStateChanged is like a open subscription that will return the user
4. Since it is a open subscription, hence we will want to close the subscription whenever we unmount this component (exit the application) to prevent memory leaks
5. To close the subscription, we use unsubscribeFromAuth or any other variable with suitable name
6. The userAuth behind async is referring to the user return from onAuthStateChanged
*/

/* 
Firestore
1. In firestore, the query will always return to us two types of objects which are reference and snapshot, both of them can in either the Document or Collection version
2. Query reference (can be in two types) is an object that represent the current place in the database
3. Use .get() method we can get the snapshot object
4. Document reference object is for the CRUD
5. Collection reference is for adding new documents
6. Document Reference return document snapshot (firestore.doc('name'))
7. Collection Reference return query snapshot (firestore.collections('name'))
*/