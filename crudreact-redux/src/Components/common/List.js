import React, { Component } from 'react'
import TransactionForm from './TransactionForm'
import { connect } from "react-redux"
import * as action from "../../Action/AddingAction"
import { bindActionCreators } from "redux"


class List extends Component {
    state = {
        currentIndex: -1,
        // it means we have a fresh form,so that we can do insert operation
        list: this.returnList(),
        arr: [],
        page: 1,
        per_page: 5
    }
    returnList() {
        if (localStorage.getItem('data') == null)
            localStorage.setItem('data', JSON.stringify([]))
        return JSON.parse(localStorage.getItem('data'))
    }
    onAddOrEdit = (data) => {
        var list = this.returnList();
        if (this.state.currentIndex == -1) {
            list.push(data)
        }
        else {
            list[this.state.currentIndex] = data
        }

        localStorage.setItem('data', JSON.stringify(list))
        this.setState({
            list: list,
            currentIndex: -1
        })
    }
    handleEdit = (index) => {
        this.props.UpdateData(index)
    }
    handleDelete = (index) => {
        this.props.deleteData(index)

    }
    pagination = (data, page, per_page) => {
        let start = (page - 1) * Number(per_page);
        let end = start + Number(per_page);
        let slicedData = data.slice(start, end);
        let total_pages = Math.ceil(data.length / per_page)
        return {
            'data': slicedData,
            'per_page': per_page,
            'total_pages': total_pages,
        }

    }
    handleNext = (a) => {
        if (a <= this.state.arr.length) {
            this.setState({
                page: a + 1
            })
        }
    }
    handlePrev = (a) => {
        if (a > 1) {
            this.setState({
                page: a - 1
            })
        }
    }
    handlePagination = (page1) => {
        this.setState({
            page: page1

        })

    }
    render() {
       
        this.state.arr=this.props.list
        console.log(this.state.arr)
        var totalInfo = this.pagination(this.state.arr, this.state.page, this.state.per_page)
        var total_pages = totalInfo.total_pages;
        var showData = totalInfo.data
        var pageNumbers = []
        for (var i = 1; i <= total_pages; i++) {
            pageNumbers.push(i)
        }
        var button = pageNumbers.map(btn => {
            return (
                <button className="btn btn-danger" onClick={() => this.handlePagination(btn)}>{btn}</button>
            )
        })
        var nextButton = () => {
            if (this.state.page !== this.state.arr.length) {
                return (
                    <button className="btn btn-primary" onClick={() => this.handleNext(this.state.page)}> Next</button>
                )

            }
            else {
                return (
                    <button className="btn btn-primary" disabled>Next</button>
                )
            }
        }
        var prevButton = () => {
            if (this.state.page !== 1) {
                return (
                    <button className="btn btn-success" onClick={() => this.handlePrev(this.state.page)}>Prev</button>
                )
            }
            else {
                return (
                    <button className="btn btn-success" disabled>Prev</button>
                )
            }
        }
        
        return (
            <div>
                <TransactionForm
                />
                
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Cibil Score</th>
                            <th>Loan Amount</th>
                            <th>Loan Type</th>
                            <th>Edit Data</th>
                            <th>Delete Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showData.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.email}</td>
                                <td>{item.cibilScore}</td>
                                <td>{item.loanAmount}</td>
                                <td>{item.loanType}</td>
                                <td><button onClick={() => this.handleEdit(index)}>Edit</button></td>
                                <td><button onClick={() => this.handleDelete(index)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                
               
                  <div>{prevButton()}{button} {nextButton()}</div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list
    }

}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteData: action.Delete,
        UpdateData: action.UpdateIndex
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(List)


// name: ""
// age: ""
// email: ""
// cibilScore: ""
// loanAmount: ""
// loanType: ""
