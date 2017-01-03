/// <reference path='../../../../typings/index.d.ts' />

import * as React from 'react';
import * as $ from 'jquery';
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../../node_modules/animate.css/animate.min.css';
import '../../../inspinia.css';

interface IMainProps {
    location: any;
    children: any;
}
interface IMainState {}

class Main extends React.Component<IMainProps, IMainState> {

    render() {
        let wrapperClass = 'gray-bg ' + this.props.location.pathname;
        return (
            <div id='wrapper'>
                <Progress />
                <Navigation location={this.props.location}/>

                <div id='page-wrapper' className={wrapperClass}>

                    <TopHeader />

                    {this.props.children}

                    <Footer />

                </div>

            </div>

        );
    }

    componentDidMount() {

        // run correctHeight function on load and resize window event
        $(window).bind('load resize', function() {
            correctHeight();
            detectBody();
        });

        // correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300);
        });
    }
}

export default Main;
