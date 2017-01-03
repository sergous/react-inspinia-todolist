/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';

interface IMainViewProps {}
interface IMainViewState {}

class Main extends React.Component<IMainViewProps, IMainViewState> {

    render() {
        return (
            <div className='wrapper wrapper-content animated fadeInRight'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='text-center m-t-lg'>
                            <h1>
                                Welcome in INSPINIA ReactJS Seed Project
                            </h1>
                            <small>
                                It is an application skeleton for a typical web app. You can use it to quickly bootstrap your webapp projects.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Main;
