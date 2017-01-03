/// <reference path="../../../../typings/index.d.ts" />

import * as React from 'react';
import pace from 'pace';

interface IProgressProps {}
interface IProgressState {}

class Progress extends React.Component<IProgressProps, IProgressState> {
    componentDidMount() {
        pace.start();
    }

    render() {
        return (null)
    }
}

export default Progress

