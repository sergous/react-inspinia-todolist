/// <reference path="../../../../typings/index.d.ts" />

import * as React from 'react';

interface IFooterProps {}
interface IFooterState {}

class Footer extends React.Component<IFooterProps, IFooterState> {
    render() {
        return (
            <div className="footer">
                <div className="pull-right">
                    10GB of <strong>250GB</strong> Free.
                </div>
                <div>
                    <strong>Copyright</strong> EveMt &copy; 2017
                </div>
            </div>
        )
    }
}

export default Footer
