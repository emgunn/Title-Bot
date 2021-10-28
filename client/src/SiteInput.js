import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import './App.css';


function SiteInput() {

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("Enter a URL below");
    const [listURL, setListURL] = useState([]);
    const [listTitle, setListTitle] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // include https:// prefix if user doesn't include it
        const currURL = value.startsWith("https://") ? value : "https://" + value;
        const article = { url: currURL };

        // post request to our Express backend
        axios.post('/submitURL', article, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // save response data to state
                setTitle(res.data);
                setListURL([ currURL, ...listURL ]);
                setListTitle([ res.data, ...listTitle ]);
            })
            .catch(err => console.log(err.data));

    };

    return (
        <>
            <section id="home-section">
                <Container id="home" className="container-fluid">
                    <Container className="home-container">
                        <h1 className="title">{title}</h1>
                    </Container>
                    <Container className="middle-container">
                        <form onSubmit={handleSubmit}>
                            <p className="font-medium">Enter website URL:</p>
                            <label className="font-medium" htmlFor="url">https://</label>
                            <input className="w-50" type="text" name="url" value={value} onChange={e => setValue(e.target.value)}/>
                            <input type="submit" value="Submit" />
                        </form>
                    </Container>
                </Container>
            </section>
            
            <section id="history-section">
                <Container id="history" className="container-fluid">
                    <Container className="history-container">
                        <h2>History</h2>
                        <br/>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="table-column-number">#</th>
                                    <th className="w-50">Entered URL</th>
                                    <th>Page Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listURL.map((url, i) => {
                                    return [
                                        <tr>
                                            <td className="table-column-number">{i+1}</td>
                                            <td className="w-50 url">{url}</td>
                                            <td>{listTitle[i]}</td>
                                        </tr>
                                    ]
                                })}
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            </section>
        </>
    );
}

export default SiteInput;
