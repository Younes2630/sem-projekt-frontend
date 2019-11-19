import React, { useState, useEffect } from 'react';

function Persons(props){


    const facade = props.facade;
    const [persons, setPersons] = useState([]);
    useEffect(() => {
        facade.fetchPersons().then(data => { setPersons(data) })
        console.log(1);
    }, [facade]);

    return (
        <div className="main">
            <div className="wrap">
                <h1>Data</h1>
                <table>
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Height</b></td>
                            <td><b>Mass</b></td>
                            <td><b>Birth year</b></td>
                        </tr>
                        {
                            persons.map((d, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{d.name}</td>
                                        <td>{d.height}</td>
                                        <td>{d.mass}</td>
                                        <td>{d.birthyear}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Persons;