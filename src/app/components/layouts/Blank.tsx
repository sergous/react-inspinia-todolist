/// <reference path="../../../../typings/index.d.ts" />

import * as React from 'react';
import * as $ from 'jquery';

interface IBlankProps {
    children: any[];
}
interface IBlankState {}

class Blank extends React.Component<IBlankProps, IBlankState> {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

    componentDidMount() {
        $('body').addClass('gray-bg');
    }

    componentWillUnmount() {
        $('body').removeClass('gray-bg');
    }
}

export default Blank;
