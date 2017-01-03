/// <reference path='../../../../typings/index.d.ts' />

import * as React from 'react';
import * as $ from 'jquery';
// import { Dropdown } from 'react-bootstrap';
import { smoothlyMenu } from '../layouts/Helpers';

interface ITopHeaderProps {}
interface ITopHeaderState {}

class TopHeader extends React.Component<ITopHeaderProps, ITopHeaderState> {

    toggleNavigation(e: any) {
        e.preventDefault();
        $('body').toggleClass('mini-navbar');
        smoothlyMenu();
    }

    render() {
        return (
            <div className='row border-bottom'>
                <nav className='navbar navbar-static-top white-bg' role='navigation' style={{marginBottom: 0}}>
                    <div className='navbar-header'>
                        <a className='navbar-minimalize minimalize-styl-2 btn btn-primary ' onClick={this.toggleNavigation} href='#'><i className='fa fa-bars'></i> </a>
                    </div>
                    <ul className='nav navbar-top-links navbar-right'>
                        <li>
                            <a href='#'>
                                <i className='fa fa-sign-out'></i> Log out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default TopHeader;
