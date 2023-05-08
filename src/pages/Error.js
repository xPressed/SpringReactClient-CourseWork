import React from 'react';
import styles from "./css/btn.module.css"
import {Button} from "react-bootstrap";

const Error = () => {

    return (
        <div className="mt-4 container-fluid">
            <div className="row justify-content-center">
                <div className="col-10 col-xl-5">
                    <div style={{border: "2px solid #5700f7", borderRadius: "25px"}}>
                        <p className="text-center display-4 pb-3" style={{color: "black"}}>Something went wrong :(</p>
                        <p className="text-center display-4 pb-3" style={{color: "black"}}>Status Code:
                            404</p>
                        <div className="d-flex justify-content-center m-3 pb-3">
                            <Button className={["btn btn-secondary btn-lg pb-3", styles.btn].join(' ')}
                                    href="/"
                                    type="button">Go Home...
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;