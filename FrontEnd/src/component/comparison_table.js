import React, { useState, useEffect } from 'react';
import useAxios from "../hook/useAxios";
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

function ComparisonTable() {
    const { response, loading, error } = useAxios({
        method: 'get',
        url: '/ApiRoutes',
        headers: JSON.stringify({ accept: '*/*' }),
    });
    const [data, setData] = useState([]);
    const [optdata, setOptdata] = useState([]);
    const [select, setSelect] = useState();
    useEffect(() => {
        if (response !== null) {
            setData(response);
        }
    }, [response]);
    function sortopt(data) {
        let testarray = []
        for (var i = 0; i < data.plan.length; i++) {
            for (var j = 0; j < data.plan[i].opt_name.length; j++) {
                if (!testarray.includes(data.plan[i].opt_name[j])) {
                    testarray.push(data.plan[i].opt_name[j])
                }
            }
        }
        setOptdata(testarray.sort().reverse())
    }
    useEffect(() => {
        if (data.length !== 0) {
            sortopt(data)
        }
    }, [data]);
    useEffect(() => {
        if(error)
            Swal.fire(
                'Opps,cant get the response from the server11',
                'Please try later',
                'error'
            )
    }, [error]);
    return (
        <>
            {loading ? (
   
                        <Spinner animation="border"  />
                 
            ) : (
                <div>

                    <Container>
                        <Row>
                            <Col style={{ textAlign: "center" }}><span></span></Col>
                            {data.length !== 0 && data.plan.map((data, index) => {
                                return (
                                    <>
                                        <Col style={select == index ? { backgroundColor: '#2a93ff', textAlign: "center" } : { backgroundColor: 'white', textAlign: "center" }}>{data.plan_name}</Col>
                                    </>
                                )
                            })}
                        </Row>
                        {optdata && optdata.map((odata, oindex) => {
                            return (
                                <>
                                    <Row>
                                        <Col style={{ textAlign: "center" }} >{odata}</Col>
                                        {data.length !== 0 && data.plan.map((data, index) => {
                                            return (
                                                <>
                                                    <Col style={select == index ? { backgroundColor: '#2a93ff', textAlign: "center" } : { backgroundColor: 'white', textAlign: "center" }} key={oindex + '.' + index}>{data.opt_name[oindex] ? (<FontAwesomeIcon icon={faCheck} />) : (<FontAwesomeIcon icon={faTimes} />)}</Col>
                                                </>
                                            )
                                        })}
                                    </Row>
                                </>
                            )
                        })}
                        <Row>
                            <Col style={{ textAlign: "center" }}><span></span></Col>
                            {data.length !== 0 && data.plan.map((data, index) => {
                                return (
                                    <>
                                        <Col style={select == index ? { backgroundColor: '#2a93ff', textAlign: "center" } : { backgroundColor: 'white', textAlign: "center" }}>
                                            <input type="radio" id="priceRadio" name="price_group" onChange={() => setSelect(index)} />
                                            <span style={{ fontSize: "20px" }}>HK${data.plan_price}</span><span style={{ fontSize: "15px" }}>/Month</span></Col>
                                    </>
                                )
                            })}
                        </Row>
                    </Container>
                </div>
            )}





        </>

    );
}

export default ComparisonTable;