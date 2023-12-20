import React, {Component} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyContext = React.createContext()

const DEFAULT_STATE = {
    stage:1,
    restaurants:[],
    result:''
}

class MyProvider extends Component {

    state = DEFAULT_STATE;

    addRestaurantHandler = (name) => {
        this.setState((prevState) => ({
            restaurants:[
                ...prevState.restaurants,
                name
            ]
        }))
    }

    removeRestaurantHandler = (idx) => {
        let newArray = this.state.restaurants;
        newArray.splice(idx,1);
        this.setState({restaurants:newArray});
    }

    nextHandler = () => {
        const {restaurants} = this.state;
        if(restaurants.length < 2){
            toast.error('Seems like you already have your answer...',{
                position: toast.POSITION.TOP_CENTER,
                autoClose:2000
            })
        }
        else {
            this.setState({
                stage:2
            },()=>{
                setTimeout(()=>{
                    this.generateNewResult()
                },0)
            })
        }
        
    }

    generateNewResult = () => {
        const {restaurants} = this.state;
        this.setState({
            result: restaurants[Math.floor(Math.random()*restaurants.length)]
        })
    }

/*     redrawResult = () => {
        const {restaurants} = this.state;
        
        if(restaurants.length === 1){
            this.generateNewResult();
            toast.success('Yay! You have your answer!',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
        }
        else {
            this.removeRestaurantHandler(this.state.result);
            console.log(restaurants);
            this.setState({
                result: ''
            })
            console.log(restaurants)
            this.generateNewResult();
        }
 
    } */

    reset = () => {
        this.setState(DEFAULT_STATE);
    }

    render(){
        return(
            <>
                <MyContext.Provider value={{
                    state: this.state,
                    add: this.addRestaurantHandler,
                    remove: this.removeRestaurantHandler,
                    next: this.nextHandler,
                    generateResult: this.generateNewResult,
                    reset: this.reset/* ,
                    redraw: this.redrawResult */
                }}>
                    {this.props.children}

                </MyContext.Provider>
                <ToastContainer/>
            </>
            
        )
    }
}

export {
    MyContext,
    MyProvider
}