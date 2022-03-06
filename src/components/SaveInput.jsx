import React, { Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {sendPostReq} from "../common/post";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { Tab } from "@material-ui/core";


//function to send get request to server
function sendGetReq(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));
}

//onclick button delete a row from the table
function deleteRow(row) {
    fetch(`http://localhost:8000/input/${row}` , {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(
            (data) => {
                window.location.reload();
            }
        
        )
        .catch((error) => console.log(error));
}

export class ValueTable extends React.Component{


    constructor(props){
            super(props);
            this.state = {
                isFetching: false,
                values: []
            };
        }

    //reload table value when new value is added
    componentDidMount(){
        this.setState({isFetching: true});
        sendGetReq("http://localhost:8000/input")
        .then((data) => {
            this.setState({
                isFetching: false,
                values: data.data
            });
        });
    }

    //change state when new value is added
    componentDidUpdate(prevProps, prevState){
        if(prevState.values !== this.state.values){
            this.setState({
                isFetching: false,
                values: this.state.values
            });
        }
    }

    //change state when row is deleted
    componentWillUnmount(){
        this.setState({
            isFetching: false,
            values: this.state.values
        });
    }

    handleClick = (task) => {
        sendPostReq()
        this.setState({isFetching: true});
        sendGetReq("http://localhost:8000/input")
        .then((data) => {
            this.setState({
                isFetching: false,
                values: data.data
            });
        });
    }

    render(){
        return(
            <Fragment>
                <Button 
                    variant="contained"
                    color="primary"
                    startIcon={<AiOutlinePropertySafety />}
                    onClick={this.handleClick}
                    style={{margin: "10px"}}
                >
                    Add Value
                </Button>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Value</TableCell>
                                <TableCell align="right">Added On</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.values.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                    <TableCell align="right"> {row.added_on}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => deleteRow(row.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                    </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        );
    }
                            

}