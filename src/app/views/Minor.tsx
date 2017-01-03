/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';

interface IMinorViewProps {}
interface IMinorViewState {}

class Minor extends React.Component<IMinorViewProps, IMinorViewState> {

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                Sample example of second view
                            </h1>
                            <small>
                                Written in Minor.js component
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Minor
