import React, { Component } from 'react'
import {connect} from "react-redux"
import * as action from "../../Action/AddingAction"
import {bindActionCreators} from "redux"


 class TransactionForm extends Component {
    state={...this.returnStateObject()}
    returnStateObject(){
        if(this.props.currentIndex==-1){
            return{
                name:"",
                age:"",
                email:"",
                cibilScore:"",
                loanAmount:"",  
                loanType:"",    
            }
        }
        else{
            return this.props.list[this.props.currentIndex]
        }
    }
    handlechange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
  
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.props.currentIndex==-1){
            this.props.insertData(this.state)
            // prompt("data is submitted")
        }
        else{
            this.props.updateData(this.state)
        }

    }
    componentDidUpdate(prevProps){
        if(prevProps.currentIndex !=this.props.currentIndex||prevProps.list.length !=this.props.list.length){
            this.setState({...this.returnStateObject()})

        }

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autocomplete="off">
                    <p>Name</p>
                    <div>
                        <input placeholder="Name" name="name" onChange={this.handlechange} value={this.state.name}/>
                    </div>
                    <p>Age</p>
                    <div>
                        <input placeholder="Age" name="age" onChange={this.handlechange} value={this.state.age} />
                    </div>
                    <p>Email</p>
                    <div>
                        <input placeholder="Email" name="email" onChange={this.handlechange} value={this.state.email} />
                    </div>
                    <p>Cibil score</p>
                    <div>
                        <input placeholder="Cibil score" name="cibilScore" onChange={this.handlechange} value={this.state.cibilScore} />
                    </div>
                    <p>Loan Amount</p>
                    <div>
                        <input placeholder="Loan Amount" name="loanAmount" onChange={this.handlechange} value={this.state.loanAmount} />
                    </div>
                    <p>Loan Type</p>
                    <select name="loanType" onChange={this.handlechange} value={this.state.loanType}>
                        <option value="Home">Home</option>
                        <option value="Personal">Personal</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Marriage">Marriage</option>
                    </select>
                    <p></p>
                    <button type="submit">Submit</button>

                </form>


            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        list:state.list,
        currentIndex:state.currentIndex
    }

}
const mapDispatchToProps = (dispatch)=>{
    return  bindActionCreators({
        insertData:action.insert,
        updateData:action.update
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps) (TransactionForm)
